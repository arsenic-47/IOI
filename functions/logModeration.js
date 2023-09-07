const client = require("..")
const ms = require("ms")
module.exports = function (action, author, target, guild, reason, duration, date) {
  let REASONSTRING = '';
  let DURATIONSTRING = '';
  if(!action.startsWith("un")) REASONSTRING = `\n**Reason**: \`${reason || "No reason provided."}\``
  if(!action.startsWith("un")) REASONSTRING = `\n**Duration**: \`${duration}\``
  if(date) DATESTRING = `\n**Date**: <t:${date}:R>`
  const {EmbedBuilder} = require("discord.js")
    const moderationLogChannel = guild.channels.cache.get(client.config.moderationLogChannel)
  const moderationEmbed = new EmbedBuilder()
  .setTitle("Moderation log - "+action)
  .setDescription(`**Author:** <@${author.id}>\n**Target**:\n> **Username:**\`${target.user.username}\`\n> **User ID**: \`${target.user.id}\`${REASONSTRING}${DURATIONSTRING}`)
  .setTimestamp(new Date())
  moderationLogChannel.send({embeds: [moderationEmbed]})
}