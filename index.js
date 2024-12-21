// Load environment variables from .env file
require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] });

client.commands = new Collection();

// Load command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Register commands (if using slash commands)
    client.application.commands.set(client.commands.map(command => command.data));
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Use the token from the .env file
client.login(process.env.DISCORD_TOKEN);
