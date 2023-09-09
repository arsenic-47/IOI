const { ChannelType } = require("discord.js")

module.exports = {
  description: "ONLY DEVS - show bot's commands stat",
  run: async (client, message) => {
    const embed = {
      fields: []
    }
    for (const command of client.commands) {
      embed.fields.push({name: command[0], value: `\`\`\`JSON\n${JSON.stringify(command[1], null, 3)}\`\`\``})
    }
    return message.channel.type === ChannelType.DM ? message.channel.send({embeds: [embed]}) : message.member.send({embeds: [embed]})
  }
}