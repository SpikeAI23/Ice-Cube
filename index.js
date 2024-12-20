const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
let startTime = Date.now(); // Capture the bot's start time

// Load Commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.name, command);
    console.log(`Loaded command: ${command.name}`);
}

// Load Configuration
const statusConfig = require('./config/status.json');
const presenceConfig = require('./config/presence.json');

// Set Presence and Status
client.once('ready', () => {
    console.log(`${client.user.tag} is online!`);
    client.user.setPresence({
        activities: [{ name: presenceConfig.activity, type: presenceConfig.type }],
        status: statusConfig.status,
    });

    // Display uptime in the terminal
    setInterval(() => {
        const uptime = process.uptime(); // Get uptime in seconds
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        process.stdout.write(`\rUptime: ${hours}h ${minutes}m ${seconds}s `); // Overwrite the same line
    }, 1000); // Update every second
});

// Handle Slash Commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Command not found: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
    }
});

// Graceful Shutdown with SIGINT
process.on('SIGINT', () => {
    console.log('\nReceived SIGINT. Shutting down...');
    client.destroy();
    process.exit(0);
});

// Graceful Shutdown with Slash Command
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'shutdown') {
        if (interaction.user.id !== 'YOUR_USER_ID') { // Replace with your Discord user ID
            return interaction.reply({ content: 'You do not have permission to shut down the bot.', ephemeral: true });
        }

        await interaction.reply({ content: 'Shutting down the bot...', ephemeral: true });
        console.log('\nBot is shutting down via shutdown command.');
        client.destroy();
        process.exit(0);
    }
});

// Log in to Discord
client.login(process.env.TOKEN);
