require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs');


var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.api_key;


const callOne = process.argv[2];
const callTwo = process.argv[3];

switch (callOne) {
    case ('spotify-this-song'):
        if (callTwo) {
            songSearch(callTwo);
        }
        else {
            songSearch("The Sign");
        }
    break;
    case ('movie-this'):
        if(callTwo){
            omdb(callTwo)
        }
        else {
            omdb("Mr. Nobody");
        }
    break;
    case ('concert-this'):
        if (callTwo) {
            concertThis(callTwo)
        }
        else {
            concertThis("Key Arena");
        }
    break;
    case ('do-what-it-says'):
            randomRead();
           break;
    };

function songSearch(song){
    spotify.search({ type: 'track', query: song, limit: 1}, function(error, data){
        if(!error){
            var songData = data.tracks.items[i];
            for(var i = 0; i < data.tracks.items.length; i++){
            console.log("Artist: " + songData.artists[0].name);
            console.log("Song: " + songData.name);
            console.log("Preview URL: " + songData.preview_url);
            console.log("Album: " + songData.album.name);
            } 
        } 
        else {
            console.log("Something went wrong. Maybe spotify doesn't have it. Maybe you typed it wrong. Idk.");
        }
    });
}

function omdb(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';
  
    request(omdbURL, function (error, body){
        if(!error){
            var body = JSON.parse(body);
  
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
        } 
        else {
            console.log("Something went wrong. Maybe this movie doesn't exist. Maybe you typed it wrong. Idk.")
        }
        if(movie === "Mr. Nobody"){
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
      }
    });
  
  }

function concertThis(concert) {
    var concertURL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";
    request(concertURL, function(error, body) {
        if(!error){
            var body = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {  
            
            console.log("Venue Name: " + body.venue.name);
            console.log("Venue Location: " + body.venue.city);
            console.log("Event Date: " + moment(body.datetime).format("MM/DD/YYYY"));

        }}
        else {
            console.log("Something went wrong. Maybe this concert. Maybe you typed it wrong. Idk.");
        }
    });

}
function randomRead(){
    fs.readFile('random.txt', "utf8", function(error, data){
        if (error) {
            return console.log("Uhh woops?")
        }
      var txt = data.split(',');
  
      songSearch(txt[1]);
    });
  }