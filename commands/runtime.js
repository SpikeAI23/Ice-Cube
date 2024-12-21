const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('runtime')
        .setDescription('Displays the bot\'s runtime'),
    async execute(interaction) {
        // Calculate the bot's uptime
        const totalSeconds = Math.floor(process.uptime());
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const runtime = [
            days > 0 ? `${days} day(s)` : null,
            hours > 0 ? `${hours} hour(s)` : null,
            minutes > 0 ? `${minutes} minute(s)` : null,
            `${seconds} second(s)`,
        ]
            .filter(Boolean)
            .join(', ');

        // Send the runtime back as a message
        await interaction.reply({
            content: `The bot has been running for: **${runtime}**.`,
            ephemeral: true, // Only visible to the user who executed the command
        });
    },
};
