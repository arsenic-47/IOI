const express = require("express");
const app =  express();

app.listen(5000, ()=> {
  console.log("Express is running!");
})

app.get("/", (req, res) => { 
  res.send("hello world!");
})
const {GatewayIntentBits, EmbedBuilder, Client, Partials, ChannelType} = require("discord.js");
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildModeration,
GatewayIntentBits.GuildEmojisAndStickers,
GatewayIntentBits.GuildIntegrations,
GatewayIntentBits.GuildWebhooks,
GatewayIntentBits.GuildInvites,
GatewayIntentBits.GuildVoiceStates,
GatewayIntentBits.GuildPresences,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.GuildMessageReactions,
GatewayIntentBits.GuildMessageTyping,
GatewayIntentBits.DirectMessages,
GatewayIntentBits.DirectMessageReactions,
GatewayIntentBits.DirectMessageTyping,
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildScheduledEvents,
GatewayIntentBits.AutoModerationConfiguration,
GatewayIntentBits.AutoModerationExecution
],
partials: [Partials.Channel],
allowedMentions: {repliedUser: false}})
client.dir = __dirname 
const fs = require("fs") 
const { join } = require("path")
client.commands = new Map()
client.config = require(join(__dirname, "config.json"))
module.exports = client
for (let handlerFile of fs.readdirSync(join(__dirname, "handlers"))) {
  require(join(__dirname, "handlers", handlerFile))
}
let TOKEN;
  try {
    TOKEN = fs.readFileSync("token.txt", 'utf-8')
  }catch (e) {}
  const token = process.env.token || TOKEN
  !token ? (console.log("Missing token."), process.exit(0)) : client.login(token);