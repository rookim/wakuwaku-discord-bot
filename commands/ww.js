const axios = require("axios");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

module.exports = async function (msg, args) {
  axios
    .get("http://localhost:3000/favorites", {
      params: {
        username: args,
      },
    })
    .then(async (response) => {
      console.log(response.data);
      if (response.data.message === "User not found") {
        msg.reply("Sorry, couldn't find a user by that name ;-; Remember, usernames are case-sensitive!");
      } else {
        let results = response.data;
        if (results.length === 0) {
          let testMsg = "Nothing to see here~";
          var embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(`${args}'s wakuwaku Watchlist`)
            .setURL("https://discord.js.org")
            .setDescription(testMsg);
          msg.reply({ ephemeral: true, embeds: [embed] });
        } else {
          var embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(`${args}'s wakuwaku Watchlist`)
            .setURL("https://discord.js.org");
          for (item of results) {
            let name = item["show"]["name"];
            let epName = item["show"]["next_ep"]["name"];
            let epNum = item["show"]["next_ep"]["number"];
            let airtime = item["show"]["next_ep"]["airstamp"];
            embed.addField(name, `EP${epNum} - "${epName}" airs ${dayjs(airtime).from(dayjs())}`);
          }
          msg.reply({ ephemeral: true, embeds: [embed] });
        }
        // const row = new MessageActionRow().addComponents(
        //   new MessageButton().setCustomId("1").setLabel("1").setStyle("PRIMARY")
        // );
        console.log(results);
      }
    });
};
