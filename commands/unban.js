module.exports = {
    description: "Unban a member from the server.",
    usage: "<@member [id/mention/username]>",
    run: async (client, message, args) => {
        client.functions.logModeration("unban")
        // Check if a user was mentioned
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args[0]);
        if (!member) {
            return message.reply("Please provide one of these:\n1. Member id\n2. Member mention\n3. Member username");
        }
        try {
            // Ban the user
            await message.guild.members.unban(member.id)
            // Send a confirmation message
            message.channel.send(`**${member.user.tag}** has been unbanned.`);
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while trying to unban the user.");
        }
    }
}
