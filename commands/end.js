const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send({embed: 
  {color: "RED",
  description: `Looks like that you don't have the required permission to use this command!\n\nRequired Perm: **MANAGE_MESSAGES**`
  }});
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send({embed: 
  {color: "RED",
  description: `Please specify the giveaway's message ID.`
  }});
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send(':warning: Unable to find a giveaway for `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        //message.channel.send('Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
        message.channel.send({embed: 
  {color: "YELLOW",
  description: `Giveaway will end in less than **` + (client.giveawaysManager.options.updateCountdownEvery/1000)+`** seconds...`
  }})
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send({embed: 
  {color: "RED",
  description: `This giveaway is already ended!`
  }});
        } else {
            console.error(e);
            message.channel.send({embed: 
  {color: "GRAY",
  description: `An Error Occured...`
  }});
        }
    });

};

/*

=======================================================
|              Coded by: T.F.A#1887                   |
|  Do not remove credits while sharing this project!  |
|         You will get a copyright warning            |
=======================================================

*/