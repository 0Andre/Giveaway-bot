/*
({embed: 
  {color: "RED",
  description: ``
  }})
*/

const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setAuthor("🎁 Giveaway Bot! 🎁")
      .setTitle("Command List & Guide for the Bot:")
      .setDescription("**Hello!** These are the Commands below which you can do with the Bot, Right now there are **10 Commands** available now, More commands will be added soon!")
      .addField("🗒️ Bot Informations:", `\`\nDeveloper: Andre-421#9728\nPrefix: ${prefix}\n\`\`\``)
      .addField("💝 Giveaway:",`\`${prefix}start <#channel> <time [s/m/h/d]> <winners [n]> <prize>\`.\n\`${prefix}reroll <giveaway-msg-id/prize-name>.\`\n\`g!end <giveaway-msg-id/prize-name>\`.`)
      .addField("❓ Examples:", `\`${prefix}start #giveaway 5m 1 Testing\`.\n\`${prefix}end Testing\`.\n\`${prefix}reroll 9999999999\`.`)
      .addField("🦾 Utility:", `\`${prefix}ping\`, \`${prefix}invite\`, \`${prefix}eval\`.`)
      .addField("ℹ Informations:", `\`${prefix}stats\`.`)
      .addField("🔄 Last Update:", `\`\`\`fix\n[2.3] Fixed all files & configurations...\n\`\`\``)
      .setTimestamp()
      .setFooter(``);
    message.channel.send({embed: 
  {color: "GREEN",
  description: `Hey <@${message.author.id}>, I sent you the list of my Commands in DMs!`
  }});

    return message.author.send(help);
}

module.exports.help = {
  name: "help"
}
