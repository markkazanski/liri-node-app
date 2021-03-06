chooseCommand(process.argv[2], process.argv[3]); //gets command and movie/song name, passes to swithc

logData(process.argv[2] + " " + process.argv[3]);

function chooseCommand(commandString, argumentString){
    switch(commandString) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            //argumentString
            spotifySong(argumentString);
            break;
        case "movie-this":
            movieThis(argumentString);
            break;
        case "do-what-it-says":
            doWhatSays();
            break;
        default:
            break;
    }
}

function myTweets(){
    var Twitter = require('twitter');
    var twitterKeys = require("./keys.js");
    
    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    });

    //console.log(client);

    var params = {screen_name: 'RasPiTime'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for(var i=0; i < tweets.length && i <= 20; i++){
            console.log("Date: " + tweets[i].created_at);
            console.log("Tweet: " + tweets[i].text);
            console.log(" ");

            logData("Date: " + tweets[i].created_at);
            logData("Tweet: " + tweets[i].text);
            logData(" ");
        }
        
      }
    });
}

function spotifySong(argument){

    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: "fd6069095e4642c2aefdb5f319554b7d",
        secret: "b6ee6f87f65c4e0694f5c570d7eca82c"
      });

    if(argument !== undefined){ //if song name provided
        var songName = argument;
        //console.log(songName);

        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Artist: " + data.tracks.items[0].artists[0].name); 
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Link: " + data.tracks.items[0].external_urls.spotify);

            logData("Artist: " + data.tracks.items[0].artists[0].name); 
            logData("Song: " + data.tracks.items[0].name);
            logData("Album: " + data.tracks.items[0].album.name);
            logData("Link: " + data.tracks.items[0].external_urls.spotify);

            //console.log( data.tracks.items[0].artists[0].name );
        });
    }else{ //no song name = ace of base
        spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function(data) {
            console.log("Artist: " + data.artists[0].name); 
            console.log("Song: " + data.name);
            console.log("Album: " + data.album.name);
            console.log("Link: " + data.external_urls.spotify);

            logData("Artist: " + data.artists[0].name); 
            logData("Song: " + data.name);
            logData("Album: " + data.album.name);
            logData("Link: " + data.external_urls.spotify);
        })
        .catch(function(err) {
            console.error('Error occurred: ' + err); 
        });
    }
}

function movieThis(argument){
    var movieName;
    //console.log(movieName);
    if(argument !== undefined)
        movieName = argument;
    else   
        movieName = "Mr. Nobody";

    var request = require("request");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
 
    request(queryUrl, function(error, response, body) {
        
          // If the request is successful (i.e. if the response status code is 200)
          if (!error && response.statusCode === 200) {
        
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB: " + JSON.parse(body).imdbRating);

            logData("Title: " + JSON.parse(body).Title);
            logData("Year: " + JSON.parse(body).Year);
            logData("IMDB: " + JSON.parse(body).imdbRating);

            if( JSON.parse(body).Ratings[1] !== undefined ){
                console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
                logData("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            }
            else{
                console.log("Rotten Tomatoes: N/A");
                logData("Rotten Tomatoes: N/A");
            }
            
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Langauge: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

            logData("Country: " + JSON.parse(body).Country);
            logData("Langauge: " + JSON.parse(body).Language);
            logData("Plot: " + JSON.parse(body).Plot);
            logData("Actors: " + JSON.parse(body).Actors);

                
            //console.log( JSON.parse(body) );
          }
        });
}

function doWhatSays(){
    var fs = require("fs");
    fs.readFile("./random.txt", "utf8", function(error, data) {
       // console.log(data);
        var dataArr = data.split(",");
       // console.log(dataArr[0] + " " + dataArr[1]);
        chooseCommand(dataArr[0], dataArr[1]); //weird recursive stuff
    });
}

function logData(dataToLog){
    //console.log(dataToLog);

    var fs = require("fs");
    fs.appendFile("log.txt", dataToLog + "\r\n", function(err) {
        
            // If an error was experienced we say it.
            if (err) {
              console.log(err);
            }
        
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
              //console.log("Content Added!");
            }
        
          });
}