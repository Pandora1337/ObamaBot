const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageSelectMenu, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'quiz',
    description: 'Lets you play a few quizes!',
    aliases: ['q'],
    usage: '<quiz name>',
    emoji: '🤔',
    args: false,
    guildOnly: false,
    masterOnly: false,
    data: new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('Lets you play a few quizes!')
        .addStringOption(option => option.setName('quiz-name')
            .setDescription('The name of a quiz to play')
			.addChoice('MonkeValues', 'monke')  //non dynamic, too bad!
			.addChoice('Political Compass', 'pc')
        ),

    async execute(message, brug, client) {

        if (message.type == 'APPLICATION_COMMAND') { // slash command conversion
            message.author = message.user
            var args = message.options.getString('quiz-name')
            
        } else if (message.type == 'MESSAGE_COMPONENT') { 
            message.author = message.user
            var args = brug

        } else { var args = brug.join(' ').toLowerCase() }

        
        if (args != null && client.quizes.some(a => a.longName == args || a.name == args  && a.isQuiz == true)) {
            const q = client.quizes.find(a => a.longName == args || a.name == args && a.isQuiz == true)
            //message.reply({ content: `Starting \`${q.longName}\` quiz...`, allowedMentions: { repliedUser: false } });
            return q.execute(message, message.author);
        }

        var msg = await message.reply({
            content: 'Select the quiz you want to play from the menu!\n',
            components: [BuildAMenu()],
            ephemeral: false,
            fetchReply: true,
            allowedMentions: { repliedUser: false }
        });

/*
        var collector = msg.createMessageComponentCollector({ componentType: 'SELECT_MENU', idle: 60000 * 10, errors: ['idle'] })

        collector.on('collect', async (menu) => {
            await menu.deferUpdate();
            client.quizes.get(menu.values[0]).execute(message, menu.user)
        });

        collector.on('end', (menu, reason) => {
            if (reason != 'idle') return
            msg.edit({ content: 'Use my \`quiz\` command to play a quiz!', components: [] })
        })
    */

        function BuildAMenu() {

            const quizmenu = new MessageSelectMenu()
                .setCustomId('quizmenu')
                .setPlaceholder('Select a quiz to play!')
                .setMaxValues(1);

            const files3 = client.quizes.filter(quiz => quiz.isQuiz === true);

            files3.forEach(c => {
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