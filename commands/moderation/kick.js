module.exports = {
    description: "Kick a member from the server.",
    usage: "<@member [id/mention/username]> [reason]",
    run: async (client, message, args) => {
        client.functions.logModeration("kick")
        if (!message.member.roles.cache.find(role => role.id === client.config.staffRole)) {
            return message.reply("You don't have permission to kick members.");
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args[0]);
        if (!member) {
            return message.reply("Please provide one of these:\n1. Member id\n2. Member mention\n3. Member username");
        }

        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply("Cannot kick this member since they have a higher role than you.");
        } else if (member.roles.highest.position >= message.guild.members.me.roles.highest.position) {
            return message.reply("Cannot kick this member since they have a higher role than me.");
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
    }
};
