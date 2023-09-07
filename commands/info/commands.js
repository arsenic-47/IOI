module.exports = {
    description: "Show user the commands",
    run: async (client, message, args) => {
        const {EmbedBuilder} = require("discord.js")
        const embeds = [new EmbedBuilder()
        .setTitle("Bot commands - Total: "+client.commands.size)
        .setDescription("# Select a category")]
      const commands = []
      for (const command of client.commands) {
        const newObject = command[1]
        newObject.name = command[0]
        commands.push(newObject)
      }
      const categories = {}
      for (category of commands.map(command => command.category)) {
        categories[category] = []
      }

      for (const command of commands) {
        categories[command.category].push(command)
      }
      const keys = Object.keys(categories)
      for (const key of keys) {
        const fields = []
        const commandsList = categories[key]
        for (let command of commandsList) {
          const commandName = command.name
          const commandUsage = command.usage
          delete command.name
          if(command.usage) {command.usage = `${client.config.prefix}${commandName} ${commandUsage}`}else delete command.usage
          delete command.category
          const fieldContent = `\`\`\`JSON\n${JSON.stringify(command, null, 1)}\`\`\``
          fields.push({name: commandName, value: fieldContent})
        }
        const newEmbed = new EmbedBuilder()
        .setDescription(`## ${key} - Total: ${fields.length}`)
        .setFields(fields)
        embeds.push(newEmbed)
      }
      const selectCategory
      return await message.reply({components: [selectCategory]})
    }
}