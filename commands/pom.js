const axios = require("axios");
module.exports = async function (msg) {
  var url = `https://g.tenor.com/v1/search?q=pomeranian&key=${process.env.TENOR_API_KEY}&contentfilter=high`;
  var response = await axios.get(url);
  var json = await response.data;
  var index = Math.floor(Math.random() * json.results.length);
  msg.reply(json.results[index].url);
  msg.channel.send("🔗: Tenor GIFs");
};
