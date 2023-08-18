module.exports = {
    description: "Show user the commands",
    run: async (client, message, args) => {
        const {EmbedBuilder} = require("discord.js")
        const embed = new EmbedBuilder()
        .setTitle("Bot commands - Total: "+client.commands.size
        .setDescription("# Here are bot commands:")
        )
    }
}