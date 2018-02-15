
require("dotenv").config();
//9. Add the code required to import the keys.js file and store it in a variable
var fs = require("fs");
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//twitter logic
var params = {mott_jenkins: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      var count = 0;
      for (var i = 0; i < tweets.length; i++) {
        count++;
        console.log(`tweet number ${count}: ${tweets[i].text}`);
      }

  }
});
//spotify logic straight from their documentation
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
} else {
    for (var s = 0; s < data.length; s++){

    }
}

console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
});





















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
