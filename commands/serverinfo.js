const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the current server.'),
    async execute(interaction) {
        const { guild } = interaction;

        const serverInfoEmbed = {
            color: 0x0099ff,
            title: `Server Information for ${guild.name}`,
            fields: [
                {
                    name: 'Server ID',
                    value: `${guild.id}`,
                    inline: true,
                },
                {
                    name: 'Owner',
                    value: `${guild.ownerId}`,
                    inline: true,
                },
                {
                    name: 'Total Members',
                    value: `${guild.memberCount}`,
                    inline: true,
                },
                {
                    name: 'Created On',
                    value: `${guild.createdAt.toDateString()}`,
                    inline: true,
                },
                {
                    name: 'Region',
                    value: `${guild.preferredLocale}`,
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: 'Use /help for more commands!',
            },
        };

        await interaction.reply({ embeds: [serverInfoEmbed] });
    },
};
