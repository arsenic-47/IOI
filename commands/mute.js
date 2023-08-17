module.exports = {
    description: "Mute a member in the server.",
    usage: "<@member [id/mention/username]> [reason]",
    run: async (client, message, args) => {
        client.functions.logModeration("mute")
        const staffRole = (member) => member.roles.cache.find(role => role.id === client.config.staffRole)
        if (!staffRole(message.member)) {
            return message.reply("You don't have permission to mute members.");
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args[0]);
        if (!member) {
            return message.reply("Please provide one of these:\n1. Member id\n2. Member mention\n3. Member username");
        }

        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply("Cannot mute this member since they have a higher role than you.");
        } else if (member.roles.highest.position >= message.guild.members.me.roles.highest.position) {
            return message.reply("Cannot mute this member since they have a higher role than me.");
        }else if(staffRole(member)) {
            return message.reply("Cannot mute other staff. You can only kick/ban staff (if their roles are below my role).")
        }

        // Get the reason for the mute
        const reason = args.slice(1).join(" ") || "No reason provided";

        try {
            // Mute the user
            await member.timeout(5 * 60 * 1000, reason)
            member.send(`You have been muted.\n> **Reason**: \`${reason}\``).then(() => {}).catch(() => {})
            // Send a confirmation message
            message.channel.send(`**${member.user.tag}** has been muted.\n> **Reason**: \`${reason}\``);
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while trying to mute the user.");
        }
    }
};
