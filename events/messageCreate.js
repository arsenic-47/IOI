const { ChannelType } = require("discord.js")
const client = require("..")
client.on("messageCreate", async message => {
    const args = message.content.split(" ")
    const cmd = args.shift()
    const command = client.commands.get(cmd.split(client.config.prefix)[1])
    if(cmd.startsWith(client.config.prefix) && command) {
      if(message.channel.type === ChannelType.GuildText && command.category !== "dev") return await command.run(client, message, args)
      if(message.channel.type === ChannelType.DM && command.category === "dev") return await command.run(client, message, args)
    }
})