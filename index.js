const express = require("express");
const app =  express();

app.listen(5000, ()=> {
  console.log("project is running!");
})

app.get("/", (req, res) => { 
  res.send("hello world!");
})
const {truthOrDare} = require("multi-purpose")
const Discord = require("discord.js");
const {EmbedBuilder} = Discord
const client = new Discord.Client({ intents: ['Guilds','GuildMessages','MessageContent'], allowedMentions: {repliedUser: false} })
 const fs = require("fs") 
 const Categories = fs.readdirSync("./commands")
client.commands = new Map()
client.config = require(__dirname+"/config.json")
for (const category of Categories) {
  fs.readdirSync(__dirname+`/commands/${category}`).forEach(commandFileName => {
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
client.on("messageCreate", async message => {

  if(message.content.toLowerCase() === "ping") {
    message.channel.send("pong")
  }
  if(message.content.toLowerCase() === "gay") {
    message.channel.send("why are you gay")
  }
  if(message.content.toLowerCase() === "im not gay") {
    message.channel.send("you are gay")
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


client.login(client.config.token);

require(__dirname+"/table.js")(client)