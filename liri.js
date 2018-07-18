require('dotenv').config();

let fs = require('fs');
let request = require('request');
let rp = require('request-promise');
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let keys = require('./keys.js');

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

// The first will be the asking LIRI ('my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says')
// The second will be additional information 
let ask_liri = process.argv[2];
let input = process.argv[3];

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (ask_liri) {
case "my-tweets":
  showTweets();
  break;

case "spotify-this-song":
  showSpotify();
  break;

case "movie-this":
  showMovie();
  break;

case "do-what-it-says":
  showWhat();
  break;
}

function showTweets() {
    let params = {
        screen_name: 'alexanderjbeal',
        count: 5
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {
                console.log(`
                \n----------------
                \n${tweets[i].created_at}
                \n${tweets[i].text}`);
            }
        }
    });
}

function showSpotify(){

    if (input === '') input = 'Victory Notorious B.I.G.';

    spotify.search({
        type: 'track',
        query: input
    })
  .then(function(response) {
    let info = response.tracks.items[0];
        console.log(`
        \n---- Spotify ----
        \nArtist: ${info.artists[0].name}
        \nTrack: ${info.name}
        \nAlbum: ${info.album.name}
        `);
  })
  .catch(function(error) {
    console.log(error);
  });

}

function showMovie() {

    if (input === '') input = 'Mr. Nobody';

    let options = {
        uri: `http://www.omdbapi.com/?apikey=trilogy&t=${input}`,
        json: true,
    };

    rp(options)
        .then(function (response) {
            console.log(`
            \n---- OMDb ----
            \nTitle: ${response.Title}
            \nIMDb: ${response.Ratings[0].Value}
            \nRotten Tomatoes: ${response.Ratings[1].Value}
            \nYear: ${response.Year}
            \nCountry: ${response.Country}
            \nLanguage: ${response.Language}
            \nPlot: ${response.Plot}
            \nActors: ${response.Actors}
            `);
    })

    .catch(function (error) {
        console.log(error);
    });
}

function showWhat() {

    fs.readFile("random.txt", "utf8", (error, data) => {

        if (error) throw error;
      
        let read_song = data.split(',').slice(1);

        spotify.search({
            type: 'track',
            query: read_song
        })
        .then(function(response) {
            let info = response.tracks.items[0];
                console.log(`
                \n---- Spotify ----
                \nArtist: ${info.artists[0].name}
                \nTrack: ${info.name}
                \nAlbum: ${info.album.name}
                `);
          })
          .catch(function(error) {
            console.log(error);
          });
        
      });
}