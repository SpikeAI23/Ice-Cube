// Example command file: commands/ping.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('developername')
    .setDescription('Shows the owners of the bot'),
  async execute(interaction) {
    await interaction.reply('@re_sistance - owner / scripter');
  },
};
