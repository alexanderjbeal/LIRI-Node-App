require('dotenv').config();

let fs = require('fs');
let request = require('request');
let Twitter = require('twitter');
// let Spotify = require('spotify');
let keys = require('./keys.js');

// let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

// The first will be the asking LIRI ('my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says')
// The second will be additional information 
let ask_liri = process.argv[2];
let data_liri = process.argv[3];

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (ask_liri) {
case "my-tweets":
  myTweets();
  break;

case "spotify-this-song":
  spotifyThis();
  break;

case "movie-this":
  movieThis();
  break;

case "do-what-it-says":
  doWhat();
  break;
}

function myTweets() {
    let params = {
        screen_name: 'alexanderjbeal',
        count: 5
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {
                console.log(`----------------`);
                console.log(`Tweet: ${tweets[i].text}`);
            }
        }
    });
}

function spotifyThis() {

}

function movieThis() {
// Request to the OMDB API with the movie specified
let queryUrl = `http://www.omdbapi.com/?t=${data_liri}&apikey=trilogy`;
request(queryUrl, function(error, response, body) {

    // If process.argv[3] (movie title) is undefined, run code for Mr. Nobody
    if (`${JSON.parse(body).Title}` === 'undefined') {
        let nobodyUrl = `http://www.omdbapi.com/?t=Mr.+Nobody&apikey=trilogy`;
        request(nobodyUrl, function(error, response, body) {
            console.log(`---- MOVIE ----`);
            console.log(`Title: ${JSON.parse(body).Title}`);
            console.log(`IMDb: ${JSON.parse(body).Ratings[0].Value}`);
            console.log(`Rotten Tomatoes: ${JSON.parse(body).Ratings[1].Value}`);
            console.log(`Year: ${JSON.parse(body).Year}`);
            console.log(`Country: ${JSON.parse(body).Country}`);
            console.log(`Language: ${JSON.parse(body).Language}`);
            console.log(`Plot: ${JSON.parse(body).Plot}`);
            console.log(`Actors: ${JSON.parse(body).Actors}`);
            console.log(`----------------`);
        });
    }

    // If process.argv[3] (movie title) is sucessful or not undefined, run this code
    else if (!error && response.statusCode === 200) {
      console.log(`---- MOVIE ----`);
      console.log(`Title: ${JSON.parse(body).Title}`);
      console.log(`IMDb: ${JSON.parse(body).Ratings[0].Value}`);
      console.log(`Rotten Tomatoes: ${JSON.parse(body).Ratings[1].Value}`);
      console.log(`Year: ${JSON.parse(body).Year}`);
      console.log(`Country: ${JSON.parse(body).Country}`);
      console.log(`Language: ${JSON.parse(body).Language}`);
      console.log(`Plot: ${JSON.parse(body).Plot}`);
      console.log(`Actors: ${JSON.parse(body).Actors}`);
      console.log(`----------------`);
     } else console.log(error);
    });
}

function doWhat() {

}