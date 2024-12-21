const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists all available commands or provides information about a specific command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command you want help with')
                .setRequired(false)
        ),
    async execute(interaction) {
        // Check if the interaction is happening in a DM
        if (!interaction.guild) {
            return await interaction.reply({
                content: 'This command cannot be used in DMs. Please use it in a server!',
                ephemeral: true
            });
        }

        // Retrieve the specific command the user requested, if any
        const commandName = interaction.options.getString('command');
        
        // If a specific command was requested
        if (commandName) {
            const command = interaction.client.commands.get(commandName);

            // If the command exists, display its help information
            if (command) {
                const commandFields = [
                    { name: 'Description', value: command.data.description },
                    { name: 'Usage', value: `/${command.data.name}` },
                ];

                // Add command options dynamically (if any)
                if (command.data.options && command.data.options.length > 0) {
                    const options = command.data.options.map(opt => `${opt.name} - ${opt.description}`).join('\n');
                    commandFields.push({ name: 'Options', value: options });
                }

                const helpEmbed = {
                    color: 0x0099ff,
                    title: `Command: /${command.data.name}`,
                    description: command.data.description,
                    fields: commandFields,
                    timestamp: new Date(),
                    footer: {
                        text: 'Use /command_name to execute a command!',
                    },
                };

                return await interaction.reply({ embeds: [helpEmbed] });
            } else {
                return await interaction.reply({
                    content: `No command found with the name \`/${commandName}\`. Please check the command and try again.`,
                    ephemeral: true,
                });
            }
        }

        // If no specific command was requested, list all commands
        const commands = interaction.client.commands.map(command => {
            return `**/${command.data.name}**: ${command.data.description}`;
        }).join('\n');

        // If no commands are registered, show a fallback message
        if (!commands) {
            return await interaction.reply({
                content: 'No commands available. Please check back later.',
                ephemeral: true,
            });
        }

        const helpEmbed = {
            color: 0x0099ff,
            title: 'Available Commands',
            description: commands,
            timestamp: new Date(),
            footer: {
                text: 'Use /command to execute a command!',
            },
            image: {
                url: 'https://i.imgur.com/BjLDFe1.png' // Replace with your banner image URL
            },
        };

        await interaction.reply({ embeds: [helpEmbed] });
    },
};
