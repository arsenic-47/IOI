module.exports = {
    description: "Unmute a member in the server.",
    usage: "<@member [id/mention/username]>",
    run: async (client, message, args) => {
        client.functions.logModeration("unmute")
        // Check if a user was mentioned
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args[0]);
        if (!member) {
            return message.reply("Please provide one of these:\n1. Member id\n2. Member mention\n3. Member username");
        }
        try {
            // Kick the user
            await member.timeout(null)
            // Send a confirmation message
            message.channel.send(`**${member.user.tag}** has been unmuted.`);
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while trying to unmute the user.");
        }
    }
};
