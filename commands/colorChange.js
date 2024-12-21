const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('colorchange')
        .setDescription('Displays a color-changing embed!'),
    async execute(interaction) {
        const embed = {
            title: 'Color Changing Embed',
            description: 'Watch as the color changes dynamically!',
            color: 0xff0000, // Initial color (red)
        };

        const message = await interaction.reply({
            embeds: [embed],
            fetchReply: true,
        });

        let colorIndex = 0;
        const colors = [
            0xff0000, // Red
            0xffa500, // Orange
            0xffff00, // Yellow
            0x008000, // Green
            0x0000ff, // Blue
            0x4b0082, // Indigo
            0xee82ee, // Violet
        ];

        const interval = setInterval(async () => {
            colorIndex = (colorIndex + 1) % colors.length;
            embed.color = colors[colorIndex];

            try {
                await message.edit({ embeds: [embed] });
            } catch (err) {
                console.error('Error updating the embed:', err);
                clearInterval(interval);
            }
        }, 2000); // Change color every 2 seconds

        // Stop the color change after 30 seconds
        setTimeout(() => {
            clearInterval(interval);
        }, 30000);
    },
};
