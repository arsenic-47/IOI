module.exports = {
    description: "Mute a member in the server.",
    usage: "<@member> [duration] [reason]",
    run: async (client, message, args) => {
      const ms = require("ms")
        const staffRole = (member) => member.roles.cache.find(role => role.id === client.config.staffRole)
        if (!staffRole(message.member)) {
            return message.reply("You don't have permission to mute members.");
        }
      const guild = client.guilds.cache.get(message.guild.id)
      let duration = args[1]
        // Check if a user was mentioned
      const members = await guild.members.fetch()
        const member = message.mentions.members.first() || members.get(args[0]) || guild.members.cache.find(member => member.user.username === args[0]);
        if(guild.bans.cache.get(client.users.cache.get(args[0]) || client.users.cache.find(user => user.username === args[0]) || args[0])) {
        return message.reply("Member has got banned from the server.")
        }else if (!member) {
            return message.reply("Please provide one of these:\n1. Member id\n2. Member mention\n3. Member username\n(Maybe the member isn't in the server...)");
        }

        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply("Cannot mute this member since they have a higher role than you.");
        } else if (member.roles.highest.position >= guild.members.me.roles.highest.position) {
            return message.reply("Cannot mute this member since they have a higher role than me.");
        }else if(staffRole(member)) {
            return message.reply("Cannot mute other staff. You can only kick/ban staff (if their roles are below my role).")
        }else if(!duration || isNaN(Number(ms(duration)))) {
          return message.reply("Please specify mute duration.\nFor example: \`60s, 5w, 30m, 1h...\`")
        }else if (member.user.bot) {
          return message.reply("Invalid request:\n> cannot apply moderation action to bots.")
        }else if(member.communicationDisabledUntilTimestamp) {
          const duration = member.communicationDisabledUntilTimestamp - Date.now()
          return message.reply(`Member is already muted!\n> **Duration**: \`${ms(duration).replaceMs()} left\``)
          }
        duration = Number(ms(args[1]))
        // Get the reason for the mute
        const reason = args.slice(2).join(" ") || "No reason provided";

        try {
            // Mute the user
            await member.timeout(duration, reason)
            setTimeout(() => {
              logModeration("auto-unmute", client.user, member, guild)
            }, duration)
            member.send(`You have been muted.\n> **Reason**: \`${reason}\`\n**Duration**: \`${ms(duration)}\``).then(() => {}).catch(() => {})
            // Send a confirmation message
            message.channel.send(`**${member.user.tag}** has been muted.\n> **Reason**: \`${reason}\`\n`);
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while trying to mute the user.");
        }
      client.functions.logModeration("mute", message.author, member, guild, reason, ms(duration))
    }
};
