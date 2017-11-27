var twitterKeys = require("./keys.js");

console.log(twitterKeys);

var command = process.argv[2];

switch(command) {
    case "my-tweets":
        myTweets();
        break;
    /*case n:
        code block
        break;*/
    default:
        break;
}

function myTweets(){
    
}