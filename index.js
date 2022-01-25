const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');
client.config = config;

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: ":tada:"
    }
});
//Coded by Andre

/* Load all events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`[Giveaway] Status: ✅ | Event Loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();

/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`[Giveaway] Status: ✅ | Command Loaded: ${commandName}`);
    });
});

// Login through the client
client.login(process.env.token);
