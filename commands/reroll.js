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
  description: `Please specify the message ID.`
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
        //return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
        return message.channel.send({embed: 
          {color: "RED",
          description: `Unable to find a giveaway for \``+ args.join(' ') + `\`...\n\nTo get a message's ID, go to your \`Account Settings > Advanced > Developer Mode = ON\`. Then click on three dots on the giveaway message, then select "Copy ID"`
          }});
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send({embed: 
  {color: "GREEN",
  description: `Giveaway Rerolled!`
  }});
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send({embed: 
  {color: "RED",
  description: `This giveaway is not ended!`
  }});
        } else {
            console.error(e);
            message.channel.send({embed: 
  {color: "RED",
  title: "```diff\n- ERROR WARNING\n```",
  description: ``
  }});
        }
    });

};