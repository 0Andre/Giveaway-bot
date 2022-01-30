const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if(message.author.bot) return;
  
  let prefix = config.prefix;
  
  if(!message.content.startsWith(prefix)) return;
  
  //const m = await message.channel.send("Hold on .....")
  const m = await message.channel.send({embed: 
  {color: "RED",
  description: `Calculating...`
  }})
  
  let pong = new Discord.MessageEmbed()
  .setTitle("🏓 Pong!")
  .setColor('RANDOM')
  .setTimestamp()
  .addField("Latency:", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("API Latency:", `${Math.round(client.ws.ping)}ms`, true)
  .setFooter(``, message.author.displayAvatarURL());

  m.edit(pong)
}

module.exports.help = {
  name: "ping"
}
