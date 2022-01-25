const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send({embed: 
  {color: "RED",
  description: `Looks like that you don't have the required permission to use this command!\n\nRequired Perm: **MANAGE_MESSAGES**`
  }});
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send({embed: 
  {color: "RED",
  description: `**You didn't mentioned a channel!**\n\nCommand Usage:\`\`\`fix\ng!start <#channel> <time [s/m/h/d]> <number_of_winners> <prize>\n\`\`\``
  }});
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send({embed: 
  {color: "RED",
  description: `**Please specify a valid duration!**\n\nCommand Usage:\`\`\`fix\ng!start <#channel> <time [s/m/h/d]> <number_of_winners> <prize>\n\`\`\``
  }});
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send({embed: 
  {color: "RED",
  description: `**You didn't provide a number of giveaway's winners!**\n\nCommand Usage:\`\`\`fix\ng!start <#channel> <time [s/m/h/d]> <number_of_winners> <prize>\n\`\`\``
  }});
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send({embed: 
  {color: "RED",
  description: `**Please specify a prize!**\n\nCommand Usage:\`\`\`fix\ng!start <#channel> <time [s/m/h/d]> <number_of_winners> <prize>\n\`\`\``
  }});
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: parseInt(giveawayNumberWinners),
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉 **NEW GIVEAWAY!** 🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY ENDED!** 🎉",
            timeRemaining: "\nTime remaining: **{duration}**!",
            inviteToParticipate: "\n**__Giveaway Status:__** ✅\nReact with 🎉 to participate!",
            winMessage: "🎉 Congratulations, {winners}! You won the prize: **{prize}**!",
            embedFooter: "Giveaway Bot!",
            noWinner: "\n**__Giveaway Status__**: ⛔ \nGiveaway has been cancelled by a Staff or no Valid participations.",
            hostedBy: "\nHosted by: {user}",
            winners: "Winner(s)",
            endedAt: "Giveaway Bot!",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send({embed: 
  {color: "GREEN",
  title: "Giveaway:",
  description: `Giveaway Started now at ${giveawayChannel}!`
  }});

};

/*

=======================================================
|              Coded by: T.F.A#1887                   |
|  Do not remove credits while sharing this project!  |
|         You will get a copyright warning            |
=======================================================

*/