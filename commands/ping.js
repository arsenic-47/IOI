module.exports = {
    description: "Ping pong! Shows bot ping.",
    run: (client, message, args) => {
        message.member.send("test").then(() => {}).catch(() => {})
        message.reply({ content: "Loading..."}).then(async msg => {
            const pingEmbed = {
                content: "Loaded!",
                embeds: [{
                    description: `# Pong! 🏓\n> Latency is \`${msg.createdTimestamp - message.createdTimestamp}\`ms.\n> API Latency is \`${Math.round(client.ws.ping)}\`ms`,
                    color: 0x00FF00, // You can change this color as you like
                    footer: {
                        text: "Ping Pong Bot"
                    }
            }]
                }
            msg.edit(pingEmbed);
        });
    }
}
