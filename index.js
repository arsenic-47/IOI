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
const client = new Discord.Client({ intents: ['Guilds','GuildMessages','MessageContent'] })
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
})


client.login("MTEzOTAzMjA3MTE4OTMxMTU4OA.GzeXsN.4ZsbUKpd-6tpZQtQS6Yn80EHzzCYeGh7Ilq7nE");

// test 
