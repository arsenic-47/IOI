const { readdirSync, readFileSync } = require("fs")
const { join } = require("path")
module.exports = {
    description: "Show user the commands",
    run: async (client, message, args) => {
      const emojis = {}
      const commands = []
      readdirSync("commands").forEach(dir => {
        emojis[dir] = readFileSync(join(client.dir, "commands", dir, "emoji.txt"), "utf-8")
        readdirSync(`commands/${dir}`).filter(fileName => fileName.endsWith(".js")).forEach(file => {
          const commandData = require(join(client.dir, 'commands', dir, file))
          commandData.category = dir
          commandData.name = file.split(".")[0]
          commands.push(commandData)
      })
    })
      const ms = require("ms")
        const {EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle} = require("discord.js")
        const embeds = [new EmbedBuilder()
        .setTitle("Bot commands - Total: "+commands.length)
        .setDescription("# Select a category")]
      const options = []
      var index = -1
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
      const closeButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId("closeSelectMenu")
        .setLabel("CLOSE")
        .setStyle(ButtonStyle.Danger)
      )
      const selectCategory = new ActionRowBuilder()
      .addComponents(selectMenu)
      const msg = await message.reply({embeds: [embeds[0]], components: [selectCategory, closeButton]})
      const filter = (i) => i.user.id === message.author.id
      const collector = msg.createMessageComponentCollector({filter, time: ms("5 minutes")})
      collector.on('collect', i => {
        if(i.customId === "selectCategory") {
          const values = i.values
          const originalEmbed = embeds[0]
          delete originalEmbed.data.title
          originalEmbed.data.description = '# Bot commands - Total: '+commands.length
          msg.edit({embeds: [originalEmbed, embeds[Number(values[0])+1]], components: [selectCategory, closeButton]})
          i.deferUpdate()
        }
        if(i.customId === 'closeSelectMenu') {
          DisableSelectMenu()
        }
      })
      function DisableSelectMenu () {
        selectMenu.setDisabled(true)
        const msgToEdit = message.channel.messages.cache.get(msg.id)
        if(!msgToEdit) return;
        embeds[0].data.description = '# Outdated commands panel.'
        const editedEmbed = embeds[0]
        msgToEdit.edit({embeds: [editedEmbed], components: [selectCategory]})
      }
      collector.on('end', () => {
        if(selectMenu.data.disabled) return;
        DisableSelectMenu()
      })
    }
}