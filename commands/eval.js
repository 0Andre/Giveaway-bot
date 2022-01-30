const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const Beautify = require('beautify');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;
  
  if (message.author.id !== "933010260040482837") {
    return message.channel.send({embed: 
  {color: "RED",
  description: `Unfortunality, Only the Developer can use this command!`
  }})
  }
  
  if (!args[0]) {
    message.channel.send({embed: 
  {color: "RED",
  description: `Please Evaluate something.`
  }})
  }
  
  try {
    if (args.join(" ").toLowerCase().includes("token")) {
      return;
    }
    
    const toEval = args.join(" ");
    const evaluated = eval(toEval);
    
    let embed = new Discord.MessageEmbed()
    .setTitle("Success!")
    .addField("To Evaluate:", `\`\`\`js\n${Beautify(args.join(" "), { format: "js" })}\n\`\`\``)
    .addField("Evaluated:", evaluated)
    .addField("Type of:", typeof(evaluated))
    .setColor("ORANGE")
    .setTimestamp()
    .setFooter(`${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send(embed);
    
  } catch (e) {
    let errorembed = new Discord.MessageEmbed()
    .setTitle("A Critical Error Occured!")
    .setDescription("Please check the command before retyping it again!")
    .addField("Error Reason:", e)
    .addField("Command Used:", `g!eval ${Beautify(args.join(" "), { format: "js" })}`)
    .setTimestamp()
    .setColor("RED")
    .setFooter(`${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send(errorembed);
  }
};
