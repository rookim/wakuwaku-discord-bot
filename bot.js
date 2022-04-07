// import dotenv module. config method tells this file to load value into process.env variable from .env file
require("dotenv").config();
const { Client, Intents } = require("discord.js");

// require statement imports the discord.js node module
const axios = require("axios");

// connection to the discord API
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); //create new client

// require commands file which contains links to all commands
const commandHandler = require("./commands");

// authenticate with discord API so they recognize my bot
// don't need the .js
client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log(`♡ ♡ ♡ Logged in as ${client.user.tag} ♡ ♡ ♡`);
});

client.on("message", commandHandler);
