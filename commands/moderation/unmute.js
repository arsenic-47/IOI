module.exports = {
    description: "Unmute a member in the server.",
    usage: "<@member>",
    run: async (client, message, args) => {
    const ms = require("ms")
        // Check if a user was mentioned
      const guild = client.guilds.cache.get(message.guild.id)
      const members = await guild.members.fetch()
        const member = message.mentions.members.first() || members.get(args[0]) || guild.members.cache.find(member => member.user.username === args[0]);
        if (!member) {
            return message.reply("Please provide one of these:\n1. Member id\n2. Member mention\n3. Member username\n(Maybe the member isn't in the server...)");
        }else if (member.user.bot) {
          return message.reply("Invalid request:\n> cannot apply moderation action to bots.")
        }else if(member.communicationDisabledUntilTimestamp) {
          const duration = member.communicationDisabledUntilTimestamp - Date.now()
          return message.reply(`Member is already muted!\n> **Duration**: \`${ms(duration).replaceMs()} left\``)
          }
        try {
            // Unmute the user
            await member.timeout(null)
            // Send a confirmation message
            message.channel.send(`**${member.user.tag}** has been unmuted.`);
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while trying to unmute the user.");
        }
      client.functions.logModeration("unmute", message.author, member, guild)
    }
};
