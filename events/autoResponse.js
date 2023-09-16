const { EmbedBuilder } = require("discord.js")
const client = require("..")
const {truthOrDare} = require("multi-purpose")
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
})