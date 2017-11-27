

var command = process.argv[2];

switch(command) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifySong();
        break;
    /*case n:
        code block
        break;*/
    default:
        break;
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
        }
        
      }
    });
}

function spotifySong(){
    var songName = process.argv[3];
    console.log(songName);
}