const { MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'quiz',
    description: 'Lets you play a few quizes!',
    aliases: ['q'],
    usage: '<quiz name>',
    emoji: '🤔',
    args: false,
    guildOnly: false,
    masterOnly: false,
    execute(message, args, client) {

        //message.delete();

        const quizmenu = new MessageMenu()
            .setID('quizmenu')
            .setPlaceholder('Select a quiz to play!')
            .setMaxValues(1);

        const files3 = client.quizes.filter(quiz => quiz.isQuiz === true);
        files3.forEach(c => {

            let option = new MessageMenuOption()
                .setLabel(c.longName)
                .setValue(c.name)
                .setDescription(`${c.description}`);
            if (c.emoji) { option.setEmoji(c.emoji) }
            if (c.author) { option.setDescription(`${c.description} by ${c.author}`) }

            quizmenu.addOptions(option)

        });

        if (client.quizes.some(a => a.name === args[0] == true && a.isQuiz == true)) return client.quizes.get(args[0]).execute(message, message.author);
        else {message.channel.send('Select the quiz you want to play from the menu!\n', quizmenu);}

        client.on('clickMenu', async (menu) => {
            if (menu.id != 'quizmenu') return;

            try {
                //message.channel.send(menu.clicker.user.displayAvatarURL({ format: 'jpg' }))
                await menu.reply.defer();
                await client.quizes.get(menu.values[0]).execute(message, menu.clicker.user)
            } catch (err) { }//console.log(err) }//
        })
    }
}