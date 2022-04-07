const axios = require("axios");

module.exports = async function (msg, args) {
  let url = `https://g.tenor.com/v1/search?q=${args}&key=${process.env.TENOR_API_KEY}&contentfilter=high`;
  let response = await axios.get(url);
  let json = await response.data;
  let index = Math.floor(Math.random() * json.results.length);
  msg.reply(`🔗Tenor GIFs: ${json.results[index].url}`);
};
