const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands.',
    async execute(interaction) {
        const bannerUrl = 'https://i.postimg.cc/jq9sMw2D/standard.gif'; // Image
        const commands = interaction.client.commands.map(cmd => `\`${cmd.name}\`: ${cmd.description}`).join('\n');

        const helpEmbed = new EmbedBuilder()
            .setColor(0x00AE86) // Choose a color for the embed ( Keep 0x )
            .setTitle('Help Menu')
            .setDescription('Here is a list of available commands:')
            .addFields({ name: 'Commands', value: commands })
            .setImage(bannerUrl) // Adds the banner image at the top
            .setFooter({ text: 'Use /command-name to execute a command.', iconURL: interaction.client.user.displayAvatarURL() });

        await interaction.reply({ embeds: [helpEmbed] });
    },
};
