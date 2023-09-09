module.exports = {
    description: "Kick a member from the server.",
    usage: "<@member> [reason]",
    run: async (client, message, args) => {
        if (!message.member.roles.cache.find(role => role.id === client.config.staffRole)) {
            return message.reply("You don't have permission to kick members.");
        }
      const guild = client.guilds.cache.get(message.guild.id)
        // Check if a user was mentioned
      const members = await guild.members.fetch()
        const member = message.mentions.members.first() || members.get(args[0]) || guild.members.cache.find(member => member.user.username === args[0]);
        if(guild.bans.cache.get(client.users.cache.get(args[0]) || client.users.cache.find(user => user.username === args[0]) || args[0])) {
        return message.reply("Member has got banned from the server.")
        }else if (!member) {
          return message.reply("Please provide one of these:\n1. Member id\n2. Member mention\n3. Member username");
        }

        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply("Cannot kick this member since they have a higher role than you.");
        } else if (member.roles.highest.position >= guild.members.me.roles.highest.position) {
            return message.reply("Cannot kick this member since they have a higher role than me.");
        }else if (member.user.bot) {
          return message.reply("Invalid request:\n> cannot apply moderation action to bots.")
        }

        // Get the reason for the kick
        const reason = args.slice(1).join(" ") || "No reason provided";

        try {
            // Kick the user
            await member.kick({reason});
            member.send(`You have been kicked.\n> **Reason**: \`${reason}\``).then(() => {}).catch(() => {})
            // Send a confirmation message
            message.channel.send(`**${member.user.tag}** has been kicked.\n> **Reason**: \`${reason}\``);
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while trying to kick the user.");
        }
      client.functions.logModeration("kick", message.author, member, guild, reason, null, Date.now())
    }
};
