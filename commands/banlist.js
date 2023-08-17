const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    description: "banlist",
    run: async (client, message, args) => {
        try {
            const bans = await message.guild.bans.fetch();
            const embed = new EmbedBuilder()
                .setTitle('Banned Users')
                .setColor('#ff0000') // Red color for emphasis
                .setDescription('List of banned users in the guild:')
                .addFields(bans.map((banInfo, index) => {
                    const reason = banInfo.reason || 'No reason provided';
                    const date = client.functions.getBanCaseDate(index);
                    return {
                        name: `Case: #${index + 1}`,
                        value: `**User ID**: \`${banInfo.user.id}\`\n**Reason**: \`${reason}\`\n**Bot**: \`${banInfo.user.bot}\`\n**Date**: \`${date}\``,
                        inline: true
                    };
                }));
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching bans:', error);
        }
    }
};
