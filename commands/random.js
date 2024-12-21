const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Get a random thing!'),
    async execute(interaction) {
        const choice = Math.floor(Math.random() * 3); // Choose a random number between 0 and 2

        switch (choice) {
            case 0:
                await interaction.reply('Here is a random number: ' + Math.floor(Math.random() * 100));
                break;
            case 1:
                const facts = [
                    'A shrimp\'s heart is in its head.',
                    'It is impossible to sneeze with your eyes open.',
                    'Banging your head against a wall burns 150 calories an hour.',
                ];
                await interaction.reply('Fun fact: ' + facts[Math.floor(Math.random() * facts.length)]);
                break;
            case 2:
                const jokes = [
                    'Why was the math book sad? Because it had too many problems.',
                    'What do you call a fish with no eyes? Fsh.',
                    'Why did the scarecrow win an award? Because he was outstanding in his field.',
                    'What do you call a magic dog? A labracadabrador.',
                    'How do poets say hello? Hey, haven’t we metaphor?',
                    'What did the 0 say to the 8? Nice belt!',
                    'A big moron and a little moron were standing on a cliff. The big moron fell off. Do you know why the other one didnt? Because he was a little more on.',
                    'How much did the pirate pay to get his ears pierced? A buccaneer!',
                    'What do you call a man with a seagull on his head? Cliff.',
                ];
                await interaction.reply('Here is a joke: ' + jokes[Math.floor(Math.random() * jokes.length)]);
                break;
        }
    },
};
