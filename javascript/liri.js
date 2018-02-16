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
        movieThis();
    } else if (process.argv[2] === "do-what-it-says") {
        doWhatItSays()
    } else {
        console.log(`   Try one of the following commands:
                        node liri my-tweets |  node liri movie-this space jam
                        node liri spotify-this-song enter sandmand   |
                        node liri do-what-it-says
                    `);
        return;
    }

};

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
            }
        }
    });
};

// //function to parlay into the argControl function
function spotifyTune() {
    //spotify logic straight from their documentation
    spotify.search({
        type: 'track',
        query: 'All the Small Things',
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            // for (var s = 0; s < data.length; s++) {
            console.log(JSON.stringify(data, null, 2));
            //data.tracks.items[s].album.name
            // }
        }
    });

};

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

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

    });

    //Feel free to change the text in that document to test out the feature for other commands.
};

function movieThis() {
    var nodeArgs = process.argv;
    // Create an empty variable for holding the movie name
    var movieName = "";
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 4; i < nodeArgs.length; i++) {
        if (i > 4 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

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
};











//
// // function spotify() {
// //
// // }
// if(process.argv[2] === "my-tweets"){
//     myTweets();
// }
//
// if(process.argv[2] === "spotify-this-song"){
//     spotifyThisSong();
// }
//
//
// var movieTitle = "";
//
//
// function movieThis(title) {
//     if(title) {
//         console.log(title)
//     } else {
//         process.argv[3];
//     }
// }
//
// // variable to contain process.argv
// var inputString = process.argv;
// //commands
// var tweets= inputString[2];
// console.log(tweets);
// var spotifyThisSong = inputString[3];
// console.log(spotifyThisSong);
// var movieThis = inputString[4];
// console.log(movieThis);
// var doWhat = inputString[5];
