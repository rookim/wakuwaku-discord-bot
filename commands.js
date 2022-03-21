const axios = require("axios");
const hi = require("./commands/hi.js");
const pom = require("./commands/pom.js");
const gif = require("./commands/gif.js");
const deez = require("./commands/deez.js");
const ping = require("./commands/ping.js");
const anime = require("./commands/anime.js");

// enhanced object literals? when property and value have the same name
let commands = { pom, hi, gif, deez, ping, anime };

// module.exports is how data is exported so that you can make use of require() in other files
module.exports = async function (msg) {
  // if statement so that bot only responds to commands in wakuwaku channel
  // also added startsWith(".") method because otherwise, the default block would induce an infinite loop (the bot basically responding itself!!). basically telling the bot to only reply when there is a period at the start of the command. (known as a prefix)
  if (msg.channel.id == process.env.CHANNEL_ID && msg.content.startsWith(".")) {
    let args = msg.content.split(" ");
    // remove first element from args array
    let command = args.shift();
    // remove prefix from command
    command = command.substring(1);
    args = args.join(" ");
    switch (command) {
      case "ping":
        commands[command](msg);
        break;
      // get back a random cute pom gif
      case "pom":
        commands[command](msg);
        break;
      case "gif":
        commands[command](msg, args);
        break;
      case "deez":
        commands[command](msg);
        break;
      case "hi":
        commands[command](msg);
        break;
      case "anime":
        commands[command](msg, args);
        break;
      default:
        // can't reference objects here?? only functions?
        console.log("WRONG COMMAND BAKA!");
        msg.reply("Enter a valid command, baka!");
    }
  }
};
