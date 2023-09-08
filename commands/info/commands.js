const { readdirSync, readFileSync } = require("fs")
const { join } = require("path")
/**
 * @param {} message
 * @returns
 */
module.exports = {
    description: "Show user the commands",
    run: async (client, message, args) => {
      const emojis = {}
      readdirSync("commands").map(dir => {
        return emojis[dir] = readFileSync(join(client.dir, "commands", dir, "emoji.txt"), "utf-8")
      })
      const ms = require("ms")
        const {EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, ComponentType, Collector, InteractionCollector, MessageCollector} = require("discord.js")
        const embeds = [new EmbedBuilder()
        .setTitle("Bot commands - Total: "+client.commands.size)
        .setDescription("# Select a category")]
      const commands = []
      const options = []
      var index = -1
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
      const categoriesList = Object.keys(categories)
      for (const category of categoriesList) {
        index+=1
        const fields = []
        const commandsList = categories[category]
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
        .setDescription(`## ${category} - Total: ${fields.length}`)
        .setFields(fields)
        embeds.push(newEmbed)
        const stringSelectOption = new StringSelectMenuOptionBuilder()
        .setLabel(category)
        .setEmoji(emojis[category])
        .setValue(`${index}`)
        options.push(stringSelectOption)
      }
      const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("selectCategory")
      .setPlaceholder("Select a commands category")
      .addOptions(
        ...options
        )
      const selectCategory = new ActionRowBuilder()
      .addComponents(selectMenu)
      const msg = await message.reply({embeds: [embeds[0]], components: [selectCategory]})
      const filter = (i) => i.user.id === message.author.id
      const collector = msg.createMessageComponentCollector({componentType: ComponentType.StringSelect, filter, time: ms("10 seconds")})
      collector.on('collect', i => {
        console.log(i)
      })
      collector.on('end', () => {
        selectMenu.setDisabled(true)
        const msgToEdit = message.channel.messages.cache.get(msg.id)
        if(!msgToEdit) return;
        embeds[0].data.description = '# Outdated commands panel.'
        const editedEmbed = embeds[0]
        msgToEdit.edit({embeds: [editedEmbed], components: [selectCategory]})
      })
    }
}