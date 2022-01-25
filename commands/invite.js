const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    let prefix = config.prefix;
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    let invite = new Discord.MessageEmbed()
    .setTitle("Invite The Bot:")
    .setDescription("Looks like that you liked our bot, right?")
    .addField("🔗 Invite Link", "[Invite the Bot!](https://discord.com/api/oauth2/authorize?client_id=935516871040573460&permissions=412585684080&scope=bot)")
    .addField("🔗 Support Server", "[Join Support Server Server!](https://discord.gg/WVKaXGpcJz)")
    .addField("Have a good day or night! 😉", "For help menu, use `g!help`!")
    .setColor("GREEN")
    .setTimestamp()
    .setFooter(``, client.user.displayAvatarURL())
    message.channel.send(invite);
}

module.exports.help = {
    name: "invite"
}

/*

=======================================================
|              Coded by: T.F.A#1887                   |
|  Do not remove credits while sharing this project!  |
|         You will get a copyright warning            |
=======================================================

*/