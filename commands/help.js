const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists all available commands or provides information about a specific command.'),
    async execute(interaction) {
        const commands = interaction.client.commands.map(command => {
            return `**/${command.data.name}**: ${command.data.description}`;
        }).join('\n');

        const helpEmbed = {
            color: 0x0099ff,
            title: 'Available Commands',
            description: commands || 'No commands available.',
            timestamp: new Date(),
            footer: {
                text: 'Use /command_name to execute a command!',
            },
            image: {
                url: 'https://i.imgur.com/your_banner_image_url.png' // Replace with your banner image URL
            }
        };

        await interaction.reply({ embeds: [helpEmbed] });
    },
};
