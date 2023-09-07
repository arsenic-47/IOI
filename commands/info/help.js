module.exports = {
  description: "Support panel",
  run: async (client, message) => {
    message.reply(`# Need help?\n**List of commands (with details like usage, description...)**: \`${client.config.prefix}commands\``)
  }
}