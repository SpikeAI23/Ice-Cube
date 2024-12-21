const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('text_image') // Change this to a valid format
        .setDescription('Generates an image from text')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to include in the image.')
                .setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');

        // Create a canvas
        const canvas = createCanvas(800, 400);
        const context = canvas.getContext('2d');

        // Set background color
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        context.fillStyle = '#000000';
        context.font = '40px sans-serif';
        context.fillText(text, 50, 100);

        // Convert canvas to buffer
        const buffer = canvas.toBuffer('image/png');

        // Send the image as a reply
        await interaction.reply({ content: 'Here is your generated image:', files: [{ attachment: buffer, name: 'image.png' }] });
    },
};
