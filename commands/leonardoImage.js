const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generateleonardo')
        .setDescription('Generates an image using Leonardo AI.')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The prompt for the image generation.')
                .setRequired(true)),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');

        try {
            // Make a request to Leonardo AI's image generation API
            const response = await axios.post('https://api.leonardo.ai/generate', {
                prompt: prompt,
                // Add any other parameters required by the API
            });

            const imageUrl = response.data.imageUrl; // Adjust based on the actual response structure

            // Send the generated image as a reply
            await interaction.reply({ content: 'Here is your generated image:', files: [{ attachment: imageUrl }] });
        } catch (error) {
            console.error('Error generating image:', error);
            await interaction.reply({ content: 'Sorry, I could not generate the image. Please try again later.' });
        }
    },
};
