const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generateprodia')
        .setDescription('Generates an image using Prodia based on your prompt')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The prompt for the image generation')
                .setRequired(true)),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        const apiKey = process.env.PRODIA_API_KEY; // Store your API key securely

        try {
            const response = await axios.post('https://api.prodia.com/generate', {
                prompt: prompt,
                apiKey: apiKey
            });

            const imageUrl = response.data.imageUrl; // Adjust based on the actual API response structure

            await interaction.reply({ content: `Here is your generated image: ${imageUrl}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Sorry, there was an error generating the image. Please try again later.', ephemeral: true });
        }
    },
};
