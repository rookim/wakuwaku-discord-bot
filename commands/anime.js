const axios = require("axios");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

module.exports = async function (msg, args) {
  axios
    .get("http://localhost:3000/animes", {
      params: {
        title: args,
      },
    })
    .then(async (response) => {
      console.log(response.data);
      if (response.data.length !== 0) {
        let results = response.data;
        // const row = new MessageActionRow().addComponents(
        //   new MessageButton().setCustomId("1").setLabel("1").setStyle("PRIMARY")
        // );
        let embed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Anime Results")
          .setURL("https://discord.js.org")
          .setDescription("Credits: TVmaze API");
        for (item of results) {
          let name = item["show"]["name"];
          let epName = item["next_ep"]["name"];
          let epNum = item["next_ep"]["number"];
          let airtime = item["next_ep"]["airstamp"];
          embed.addField(name, `EP${epNum} - "${epName}" airs ${dayjs(airtime).from(dayjs())}`);
        }
        msg.reply({ ephemeral: true, embeds: [embed] });
        console.log(results);
      } else {
        msg.reply("Sorry, couldn't find anything ;-;");
      }
    });
};
