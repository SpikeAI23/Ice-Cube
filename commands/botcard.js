const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botcard')
        .setDescription('Shows bot information with an invite link button.'),

    async execute(interaction) {
        // Bot's invite link (you should replace this with your actual bot's invite link)
        const botInviteLink = `https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=8&scope=bot%20applications.commands`;

        // Embed to show bot information
        const botEmbed = {
            color: 0x0099ff,
            title: `${interaction.client.user.username} - Bot Information`,
            description: `Here is some information about **${interaction.client.user.username}**!`,
            thumbnail: {
                url: interaction.client.user.avatarURL(),
            },
            fields: [
                {
                    name: 'Bot Username',
                    value: `**${interaction.client.user.username}**#${interaction.client.user.discriminator}`,
                    inline: true,
                },
                {
                    name: 'Bot ID',
                    value: `**${interaction.client.user.id}**`,
                    inline: true,
                },
                {
                    name: 'Bot Tag',
                    value: `**${interaction.client.user.tag}**`,
                    inline: true,
                },
                {
                    name: 'Server Count',
                    value: `**${interaction.client.guilds.cache.size}** servers`,
                    inline: true,
                },
                {
                    name: 'Invite the Bot',
                    value: 'Click the button below to invite the bot to your server!',
                },
            ],
            image: {
                url: 'https://i.imgur.com/BjLDFe1.png', // Replace this URL with your bot's banner image URL
            },
            footer: {
                text: 'Bot created by [Your Name]',
            },
            timestamp: new Date(),
        };

        // Button to invite the bot
        const inviteButton = new ButtonBuilder()
            .setLabel('Invite Me!')
            .setStyle(ButtonStyle.Link)
            .setURL(botInviteLink); // Opens the bot invite link when clicked

        // Create an ActionRow to hold the button
        const row = new ActionRowBuilder().addComponents(inviteButton);

        // Send the embed and the button
        await interaction.reply({ embeds: [botEmbed], components: [row] });
    },
};
