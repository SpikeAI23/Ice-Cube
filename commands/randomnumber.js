const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomnumber')
        .setDescription('Generates a random number within a specified range.')
        .addIntegerOption(option =>
            option.setName('min')
            .setDescription('The minimum value of the range.')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('max')
            .setDescription('The maximum value of the range.')
            .setRequired(true)
        ),
    async execute(interaction) {
        const min = interaction.options.getInteger('min');
        const max = interaction.options.getInteger('max');

        if (min > max) {
            await interaction.reply({ content: 'The minimum value must be less than or equal to the maximum value.', ephemeral: true });
            return;
        }

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        await interaction.reply(`Your random number is: **${randomNumber}**`);
    },
};
