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
        let results = response.data[0];
        // const row = new MessageActionRow().addComponents(
        //   new MessageButton().setCustomId("1").setLabel("1").setStyle("PRIMARY")
        // );
        const embed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Anime Results")
          .setURL("https://discord.js.org")
          .setDescription(
            `${results["show"]["name"]} - EP${results["next_ep"]["number"]}: ${
              results["next_ep"]["name"]
            } - airs ${dayjs(results["next_ep"]["airstamp"]).from(dayjs())}`
          );
        msg.reply({ ephemeral: true, embeds: [embed] });
        console.log(results);
      } else {
        msg.reply("Sorry, couldn't find anything ;-;");
      }
    });

  // console.log("sanity check");
  // let url = "http://localhost:3000/animes";
  // let response = await axios.get(url);
  // let json = await response.data;
};
