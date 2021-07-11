const fs = require('fs');
const {prefix} = require('../../config.json')
const Discord = require('discord.js')

module.exports = {
    name: 'quiz',
    description: 'Lets you play a few quizes!',
    aliases: 'q',
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    masterOnly: false,
    execute(message, args, client){
        client.quizes = new Discord.Collection();

        const Folder = fs.readdirSync('./storage/quiz/')

        for (const file of Folder) {
            if (file.endsWith('.js')){
            const quiz = require(`../../storage/quiz/${file}`);
            client.quizes.set(quiz.name, quiz);
            }
        }
        
        const files2 = client.quizes.filter(quiz => quiz.isQuiz === true)
            .map(quiz =>  /*${quiz.name.split('.').slice(0,-1)}*/`\`${quiz.name}\` - ${quiz.description} by ${quiz.author}`)
        const list2 = 'Here are the quizes you can play:\n\n' + files2.join('\n') + `\n\nProper usage: \`${prefix}q [quiz name]\``
        
        if (!args.length) { return message.channed.send(list2) }

        if (client.quizes.some(a => a.name === args[0] == true)) return client.quizes.get(args[0]).execute(message)
    }
}