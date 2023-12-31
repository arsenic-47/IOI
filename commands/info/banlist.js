const { EmbedBuilder } = require('discord.js');

module.exports = {
    description: "banlist",
    run: async (client, message, args) => {
        try {
            const bans = await message.guild.bans.fetch();
            let embed = new EmbedBuilder()
                .setTitle('Banned Users')
                .setColor('#ff0000') // Red color for emphasis
                .setDescription('List of banned users in the guild:')
            if(bans.size === 0) { 
                embed.setTitle("Ban list is blank!").setDescription("Currently, there's nothing in the list.") 
            }else index = 0; embed.addFields(bans.map((banInfo) => {
                index+=1
                const reason = banInfo.reason || 'No reason provided';
                const date = client.functions.getBanCaseDate(`${index}`);
                return {
                    name: `Case: #${index}`,
                    value: `**User ID**: \`${banInfo.user.id}\`\n**Username**: \`${client.users.cache.get(banInfo.user.id).username}\`\n**Reason**: \`${reason}\`\n**Bot**: \`${banInfo.user.bot}\`\n**Date**: ${date !== "Date not available" ? `<t:${Number(date)}:R>` : `\`${date}\``}`,
                    inline: true
                };
            }));
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching bans:', error);
        }
    }
};
