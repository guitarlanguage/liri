require("dotenv").config();
//9. Add the code required to import the keys.js file and store it in a variable
var fs = require("fs");
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
