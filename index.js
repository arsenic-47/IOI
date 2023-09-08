String.prototype.replaceMs = function () {
  let msString = this
  msString = msString.replace("ms", ` millisecond${msString.startsWith("1") ? '' : 's'}`)
  msString = msString.replace("s", ` second${msString.startsWith("1") ? '' : 's'}`)
  msString = msString.replace("m", ` minute${msString.startsWith("1") ? '' : 's'}`)
  msString = msString.replace("h", ` hour${msString.startsWith("1") ? '' : 's'}`)
  msString = msString.replace("d", ` day${msString.startsWith("1") ? '' : 's'}`)
  msString = msString.replace("w", ` week${msString.startsWith("1") ? '' : 's'}`)
  return msString
}
const express = require("express");
const app =  express();

app.listen(5000, ()=> {
  console.log("Express is running!");
})

app.get("/", (req, res) => { 
  res.send("hello world!");
})
const {truthOrDare} = require("multi-purpose")
const {GatewayIntentBits, EmbedBuilder, Client, Partials} = require("discord.js");
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
 const Categories = fs.readdirSync("./commands")
client.commands = new Map()
client.config = require(__dirname+"/config.json")
module.exports = client
for (const category of Categories) {
  fs.readdirSync(__dirname+`/commands/${category}`).forEach(commandFileName => {
    if(!commandFileName.includes('.js')) return;
    const data = require(__dirname+`/commands/${category}/${commandFileName}`)
    data.category = category
    client.commands.set(commandFileName.split(".")[0], data)
  })
}
const functionFiles = fs.readdirSync(__dirname+"/functions")
client.functions = {}
for (const fileName of functionFiles) {
  const data = require(__dirname+`/functions/${fileName}`)
  const functionName = fileName.split(".")[0]
  client.functions[functionName] = data
}
client.on("interactionCreate", async interaction => {
  console.log(interaction)
})
client.on("messageCreate", async message => {
  if(message.content.toLowerCase() === "ping") {
    message.channel.send("pong")
  }
  if(message.content.toLowerCase() === "batman") {
    message.channel.send("It's not who I am underneath, but what I do that defines me")
  }
  if(message.content.toLowerCase() === "good bot") {
    message.channel.send("thanks daddy")
  }
  if(message.content.toLowerCase() === "gay") {
    message.channel.send("why are you gay")
  }
  if(message.content.toLowerCase() === "im not gay") {
    message.channel.send("you are gay")
  }
  if(message.content.toLowerCase() === "riya") {
    message.channel.send("riyaL")
  }
  if(message.content.toLowerCase() === "ba bitches") {
    message.channel.send("ba ba")
  }
  if(message.content.toLowerCase().includes("welcome aboard")) {
  message.channel.send("Hey new member! make sure to go through roles and rules and have a great stay!")
  }
if(message.content.toLowerCase().includes("dead")) {
   const selectedChallenges = await truthOrDare(maxValues = 1, onlyTruth = true);
  const TOD_Embed = new EmbedBuilder()
	.setColor(3093151)
	.setTitle('Truth or dare')
	.setDescription(`# ${selectedChallenges}`)
  message.channel.send({ embeds: [TOD_Embed] });
}

const args = message.content.split(" ")
const cmd = args.shift()
const command = client.commands.get(cmd.split(client.config.prefix)[1])
if(cmd.startsWith(client.config.prefix) && command) {
  await command.run(client, message, args)
}
})
let TOKEN;
  try {
    TOKEN = fs.readFileSync("token.txt", 'utf-8')
  }catch (e) {}
  const token = process.env.token || TOKEN
  !token ? (console.log("Missing token."), process.exit(0)) : client.login(token);
require(__dirname+"/table.js")(client)