require('dotenv').config();
const { Client, IntentsBitField, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar'); // Import chokidar

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });
client.commands = new Collection();

// Load presence and status from JSON files
const configFolderPath = path.join(__dirname, 'config');
const presencePath = path.join(configFolderPath, 'presence.json');
const statusPath = path.join(configFolderPath, 'status.json');

let presence = {};
let status = 'online';

try {
    presence = JSON.parse(fs.readFileSync(presencePath, 'utf-8'));
    console.log('Loaded presence configuration:', presence);
} catch (error) {
    console.error('Error loading presence configuration:', error);
}

try {
    const statusConfig = JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
    status = statusConfig.status || 'online';
    console.log('Loaded status configuration:', status);
} catch (error) {
    console.error('Error loading status configuration:', error);
}

// Function to load commands
const loadCommands = () => {
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
    const commands = [];

    client.commands.clear(); // Clear the commands before reloading

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }

    return commands;
};

// Initial load of commands
const commands = loadCommands();

// Register commands with Discord
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), // Replace with your bot's client ID
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// Watch for file changes in the commands directory
chokidar.watch(path.join(__dirname, 'commands')).on('all', (event, filePath) => {
    if (['add', 'change', 'unlink'].includes(event) && filePath.endsWith('.js')) {
        console.log(`File ${event}: ${filePath}`);
        delete require.cache[require.resolve(filePath)]; // Clear require cache
        const newCommands = loadCommands(); // Reload commands

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(process.env.CLIENT_ID),
                    { body: newCommands },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Set bot presence and status using loaded configuration
    if (presence.activities && status) {
        client.user.setPresence({
            activities: presence.activities,
            status: status
        });
        console.log('Presence and status set from configuration:', { activities: presence.activities, status });
    } else {
        console.warn('Presence or status configuration is missing or invalid. Skipping presence setup.');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
