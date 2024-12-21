const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Pong!')
      .setDescription('This is a description of the command.')
      .setImage('https://i.imgur.com/your-animated-banner-url.gif'); // Replace with your image URL

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
