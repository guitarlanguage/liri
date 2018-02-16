// jshint esnext: true
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

argControl();
//function to determine the argv and which way to go
function argControl() {
    if (process.argv[2] === "my-tweets") {
        twitterLogic();
    } else if (process.argv[2] === "spotify-this-song") {
        spotifyTune();
    } else if (process.argv[2] === "movie-this") {
        movieThis("Mr. Nobody");
    } else if (process.argv[2] === "do-what-it-says") {
        doWhatItSays()
    } else {
        console.log(`   Try one of the following commands:
                        node liri my-tweets |  node liri movie-this space jam
                        node liri spotify-this-song enter sandman   |
                        node liri do-what-it-says
                    `);
        return;
    }

};
//====================logic for my-tweets========================
function twitterLogic() {
    //straight from api documentation
    //twitter user parameter object
    var params = {
        mott_jenkins: 'nodejs'
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var count = 0;
            for (var i = 0; i < tweets.length; i++) {
                count++;
                var created = tweets[i].created_at.slice(0, 30); //wanted to
                //cut out the 0000, but that would have meant losing the year.
                console.log(`tweet number ${count}: ${tweets[i].text} | created on: ${created}`);
                console.log(`----------------------------------------------------------------------`);
            }
        }
    });
};
//===================End of twitterLogic function==============================

//===================Logic for spotifyThisSong=================================
//This will show the following information about the song in your terminal/bash
// window

// Artist(s) |  The song's name |  A preview link of the song from Spotify
//The album that the song is from
function spotifyTune() {
    var nodeArgs = process.argv;
    var songName = "";
    // console.log(nodeArgs.slice(3).join(" "));

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            //converting nodeArgs to a string for better performance
            songName = nodeArgs.slice(3).join(" ");
            console.log(songName);
        } else {

            songName += nodeArgs[i];
        }
    }
    // second loop to give us default tune (no 3rd argument? that's why i did this)
    for (var n = 2; n < nodeArgs.length; n++) {
        if (nodeArgs.length === 3) {
            songName = "I Want It That Way";
        }
    }
    //spotify logic straight from their documentation
    spotify.search({
        type: 'track',
        query: songName,

    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {

            // Artist(s)
            console.log(JSON.stringify("Artists Name: " + data.tracks.items[0].album.artists[0].name, null, 2));
            console.log(`---------------------------------------`);
            // The song's name
            console.log(JSON.stringify("Song Name: " + data.tracks.items[0].name, null, 2));
            console.log(`---------------------------------------`);
            // A preview link of the song from Spotify
            console.log(JSON.stringify("Preview Link: " + data.tracks.items[0].preview_url, null, 2));
            console.log(`---------------------------------------`);
            // The album that the song is from
            console.log(JSON.stringify("Album Title: " + data.tracks.items[0].album.name, null, 2));
            //data.tracks.items[s].album.name
            // }
        }
    });

};
//===================End of Logic for spotifyThisSong==========================
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//===================Logic for doWhatItSays====================================
function doWhatItSays() {
    //Using the fs Node package, LIRI will take the text inside of
    //random.txt and then use it to call one of LIRI's commands.

    //It should run spotify-this-song for "I Want it That Way," as follows
    //the text in random.txt.
    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("../random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        var songString = dataArr.slice(1).join();
        // We will then re-display the content as an array for later use.
        console.log(songString);
        return songString;


    });
    spotifyTune();
    //Feel free to change the text in that document to test out the feature for other commands.
};
//===================End of Logic for doWhatItSays==========================

//===================Logic for movieThis====================================
function movieThis(title) {
    var nodeArgs = process.argv;
    // Create an empty variable for holding the movie name
    var movieName = "";
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            //this code works with the omdbapi api.
            movieName = movieName + "+" + nodeArgs[i];
            console.log(movieName);

        } else if (i < 4) {

            movieName += nodeArgs[i];
        }
    }

    for (var n = 2; n < nodeArgs.length; n++) {
        if (nodeArgs.length === 3) {
            movieName = "Mr. Nobody";
        }
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            //Country where the movie was produced
            console.log("Produced in the: " + JSON.parse(body).Country);
            //Language of the movie.
            console.log("Language: " + JSON.parse(body).Language);
            // Plot of the movie.
            console.log("Plot: " + JSON.parse(body).Plot);
            // Actors in the movie.
            console.log("Actors: " + JSON.parse(body).Actors);
            // console.log("body: " + JSON.stringify(body, null, 2));
        }
    });
}
//===================End of Logic for movieThis==========================
