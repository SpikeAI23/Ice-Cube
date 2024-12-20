module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot.',
    async execute(interaction) {
        if (interaction.user.id !== '1158417396944617553') { // Replace with your Discord user ID
            return interaction.reply({ content: 'You do not have permission to shut down the bot.', ephemeral: true });
        }

        await interaction.reply({ content: 'Shutting down the bot...', ephemeral: true });
        process.exit(0); // Gracefully exits the process
    },
};
