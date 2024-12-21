const { SlashCommandBuilder } = require('discord.js');
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('obfuscate')
        .setDescription('Obfuscates a JavaScript file uploaded by the user')
        .addAttachmentOption(option =>
            option
                .setName('file')
                .setDescription('The JavaScript file to obfuscate')
                .setRequired(true)
        ),
    async execute(interaction) {
        const file = interaction.options.getAttachment('file');

        // Validate the uploaded file
        if (!file.name.endsWith('.js')) {
            return interaction.reply({
                content: 'Please upload a valid JavaScript (.js) file.',
                ephemeral: true,
            });
        }

        try {
            // Download the file
            const response = await fetch(file.url);
            const code = await response.text();

            // Obfuscate the JavaScript code
            const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                compact: true,
                controlFlowFlattening: true,
            }).getObfuscatedCode();

            // Save the obfuscated code to a new file
            const originalFileName = path.basename(file.name, '.js');
            const obfuscatedFileName = `${originalFileName}-obfuscated.js`;
            const filePath = path.join(__dirname, '../output', obfuscatedFileName);

            // Ensure the output directory exists
            if (!fs.existsSync(path.join(__dirname, '../output'))) {
                fs.mkdirSync(path.join(__dirname, '../output'));
            }

            fs.writeFileSync(filePath, obfuscatedCode);

            // Send the obfuscated file back to the user
            await interaction.reply({
                content: 'Your file has been obfuscated. Download it below:',
                files: [filePath],
                ephemeral: true,
            });

            // Clean up the file after sending
            setTimeout(() => {
                fs.unlinkSync(filePath);
            }, 60000); // Delete after 60 seconds
        } catch (error) {
            console.error('Error obfuscating file:', error);
            await interaction.reply({
                content: 'An error occurred while processing the file. Please try again.',
                ephemeral: true,
            });
        }
    },
};
