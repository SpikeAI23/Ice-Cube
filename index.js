require('dotenv').config();
const { Client, IntentsBitField, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });
client.commands = new Collection();

// Load command files
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON()); // Prepare command for registration
}

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

client.on('ready', () => {
var _0x5b6156=_0x3d8c;function _0x3d8c(_0x3722db,_0x3cc01c){var _0x3e8dd1=_0x3e8d();return _0x3d8c=function(_0x3d8caf,_0x79e26d){_0x3d8caf=_0x3d8caf-0x108;var _0x466e2f=_0x3e8dd1[_0x3d8caf];return _0x466e2f;},_0x3d8c(_0x3722db,_0x3cc01c);}(function(_0x5416af,_0x4d586a){var _0x2a4077=_0x3d8c,_0x3f4965=_0x5416af();while(!![]){try{var _0x3f1783=-parseInt(_0x2a4077(0x10a))/0x1*(-parseInt(_0x2a4077(0x115))/0x2)+-parseInt(_0x2a4077(0x111))/0x3+-parseInt(_0x2a4077(0x11a))/0x4*(-parseInt(_0x2a4077(0x120))/0x5)+parseInt(_0x2a4077(0x108))/0x6*(-parseInt(_0x2a4077(0x119))/0x7)+-parseInt(_0x2a4077(0x10f))/0x8+-parseInt(_0x2a4077(0x109))/0x9+parseInt(_0x2a4077(0x11f))/0xa;if(_0x3f1783===_0x4d586a)break;else _0x3f4965['push'](_0x3f4965['shift']());}catch(_0x469934){_0x3f4965['push'](_0x3f4965['shift']());}}}(_0x3e8d,0xe885b),console['log']('\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20_____\x20\x20\x20\x20\x20\x20'),console['log'](_0x5b6156(0x11e)),console[_0x5b6156(0x116)]('\x20\x20\x20\x20\x20\x20\x20\x20/::\x20\x20\x20\x20\x20\x20\x20'),console[_0x5b6156(0x116)]('\x20\x20\x20\x20\x20\x20\x20/::::\x20\x20\x20\x20\x20\x20'),console[_0x5b6156(0x116)](_0x5b6156(0x11d)),console[_0x5b6156(0x116)]('\x20\x20\x20\x20\x20/:::/:::\x20\x20\x20\x20\x20\x20'),console[_0x5b6156(0x116)](_0x5b6156(0x110)),console[_0x5b6156(0x116)]('\x20\x20\x20/::::\x20\x20\x20:::\x20\x20\x20\x20\x20\x20\x20'),console[_0x5b6156(0x116)](_0x5b6156(0x117)),console[_0x5b6156(0x116)](_0x5b6156(0x10d)),console[_0x5b6156(0x116)]('/:::/\x20\x20:::\x20\x20\x20:::|\x20\x20\x20\x20|'),console[_0x5b6156(0x116)](_0x5b6156(0x112)),console['log'](_0x5b6156(0x10b)),console[_0x5b6156(0x116)](_0x5b6156(0x11c)),console[_0x5b6156(0x116)](_0x5b6156(0x11b)),console[_0x5b6156(0x116)](_0x5b6156(0x114)),console[_0x5b6156(0x116)](_0x5b6156(0x10e)),console[_0x5b6156(0x116)]('\x20\x20\x20\x20\x20\x20\x20|::|\x20\x20\x20|\x20\x20'),console['log'](_0x5b6156(0x118)),console[_0x5b6156(0x116)](_0x5b6156(0x113)),console['log'](_0x5b6156(0x10c)));function _0x3e8d(){var _0x55a1a1=['\x20\x20\x20\x20\x20\x20\x20::|\x20\x20\x20|\x20\x20\x20','9331mWWNya','4Izstwa','\x20\x20\x20\x20\x20\x20\x20|::|::::/\x20\x20\x20\x20/\x20\x20\x20','\x20\x20\x20\x20\x20\x20\x20|:::::::::/\x20\x20\x20\x20/\x20','\x20\x20\x20\x20\x20\x20/::::::\x20\x20\x20\x20\x20\x20\x20\x20\x20','\x20\x20\x20\x20\x20\x20\x20\x20\x20/\x20\x20\x20\x20\x20\x20\x20\x20\x20','24788730NoliPX','3245605yGsRli','78BNYbGA','12594933IrOxVx','425351iRLvMA','\x20/____|:::::/:::/\x20\x20\x20\x20/\x20','\x20\x20\x20\x20\x20\x20\x20\x20\x20|___|\x20\x20\x20\x20\x20\x20\x20','\x20/:::/:::\x20\x20\x20:::____\x20','\x20\x20\x20\x20\x20\x20\x20|::|\x20\x20~|\x20\x20','8888008zFtyuk','\x20\x20\x20\x20/:::/__:::\x20\x20\x20\x20\x20\x20\x20','1495554kJBKUg','::/\x20\x20\x20|::::\x20\x20/:::|____|','\x20\x20\x20\x20\x20\x20\x20\x20:|\x20\x20\x20|\x20\x20\x20\x20','\x20\x20\x20\x20\x20\x20\x20|::|\x20::/____/','4ANaHcM','log','\x20\x20/::::::\x20\x20\x20:::\x20\x20\x20\x20\x20\x20'];_0x3e8d=function(){return _0x55a1a1;};return _0x3e8d();}
    console.log(`Logged in as ${client.user.tag}!`);
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
