require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

argControl();
//function to determine the argv and which way to go
function argControl() {
    if (process.argv[2] === "my-tweets") {
        twitterLogic();
    } else if (process.argv[2] === "spotify-this-song") {
        spotifyTune();
    } //else if (process.argv[2] === "movie-this") {
    //     //some function
    // } else if (process.argv[2] === "do-what-it-says") {
    //     //some function
    // } else {
    //     return;
    // }

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

//function to parlay into the argControl function
function spotifyTune() {
    //spotify logic straight from their documentation
    spotify.search({
        type: 'track',
        query: 'All the Small Things'
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            for (var s = 0; s < data.length; s++) {

            }
        }

        console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
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
