const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageSelectMenu, MessageActionRow } = require('discord.js');

const name = 'quiz'
const desc = 'Lets you play a few quizes!'

module.exports = {
    name: name, description: desc,
    aliases: ['q'],
    usage: '<quiz name>',
    emoji: '🤔',
    args: false,
    guildOnly: false,
    masterOnly: false,
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(desc)
        .addStringOption(option => option.setName('quiz-name') //dynamic choices as outlined in bot.js
            .setDescription('The name of a quiz to play')
        ),

    async execute(message, brug, client) {

        if (message.type == 'APPLICATION_COMMAND') { // slash command conversion
            message.author = message.user
            var args = message.options.getString('quiz-name')
            
        } else if (message.type == 'MESSAGE_COMPONENT') { 
            message.author = message.user
            var args = brug

        } else { var args = brug.join(' ').toLowerCase() }

        
        if (args != null && client.quizes.some(a => a.longName.toLowerCase() == args || a.name == args  && a.isQuiz == true)) {
            const q = client.quizes.find(a => a.longName.toLowerCase() == args || a.name == args && a.isQuiz == true)
            //message.reply({ content: `Starting \`${q.longName}\` quiz...`, allowedMentions: { repliedUser: false } });
            return q.execute(message, message.author);
        }

        await message.reply({
            content: 'Select the quiz you want to play from the menu!\n',
            components: [BuildAMenu()],
            ephemeral: false,
            allowedMentions: { repliedUser: false }
        });

        function BuildAMenu() {

            const quizmenu = new MessageSelectMenu()
                .setCustomId('quizmenu')
                .setPlaceholder('Select a quiz to play!')
                .setMaxValues(1);

            client.quizes.forEach(c => {
                var longDesc = c.description;
                if (c.author) { var longDesc = `${c.description} by ${c.author}` }

                quizmenu.addOptions([
                    {
                        label: c.longName,
                        description: longDesc,
                        value: c.name,
                        emoji: c.emoji,
                    }
                ])
            });
            return new MessageActionRow().addComponents(quizmenu)
        }
    }
}