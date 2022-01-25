module.exports = (client) => {
  console.log(
    `-----------------------------------\n[Client] Bot is on: ${client.channels.cache.size} Channels, ${client.guilds.cache.size} Servers, and for a total of ${client.users.cache.size} Users.\n[Client] Bot is ready to use! Please check your bot.`
  );

  const activities = [`Giveaways in ${client.guilds.cache.size} Guilds...`,"g!help",`Over ${client.users.cache.size} Users!`];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity("g!help", { type: "WATCHING" });
  }, 5000);

};
