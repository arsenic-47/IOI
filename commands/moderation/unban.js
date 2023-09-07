module.exports = {
    description: "Unban a member from the server.",
    usage: "<@member>",
    run: async (client, message, args) => {
      const guild = client.guilds.cache.get(message.guild.id)
      const bans = await guild.bans.fetch()
        const bannedMember = message.mentions.users.first() || bans.get(args[0]) || client.users.cache.find(user => user.username === args[0])
        if (!bannedMember) {
            return message.reply("Please provide one of these:\n1. Member id\n2. Member mention\n3. Member username\n(Maybe the member isn't in the server...)");
        }else if (bannedMember.user.bot) {
          return message.reply("Invalid request:\n> cannot apply moderation action to bots.")
        }
        try {
            // Ban the user
            await guild.members.unban(bannedMember.user.id)
            // Send a confirmation message
            message.channel.send(`**${bannedMember.user.tag}** has been unbanned.`);
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while trying to unban the user.");
        }
      client.functions.logModeration("unban", message.author, bannedMember, guild)
    }
}
