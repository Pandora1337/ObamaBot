const Math = require('mathjs');
const Discord = require('discord.js')
const questions = require('../../storage/quiz/monkeq.json')
const ideologies = require('../../storage/quiz/monkei.json')
const monkeresult = require('../../storage/quiz/monkeresult.js')

module.exports = {
    name: 'monke',
    description: 'Quizes you on how monke you are!',
    author: 'u/imozupa',
    isQuiz: true,
    guildOnly: false,
    masterOnly: false,
    async execute(message){
        // CODE AUTHOR = https://www.reddit.com/user/imozupa

        var max_econ, max_dipl, max_govt, max_scty; // Max possible scores
        max_econ = max_dipl = max_govt = max_scty = 0;
        var econ, dipl, govt, scty; // User's scores
        econ = dipl = govt = scty = 0;
        var qn = 0; // Question number
        var prev_answer = null;
    
        EmojiArray = ['🟦','🟩','⬜','🟧','🟥','↩️']

        const qEmbed = new Discord.MessageEmbed()
            .setTitle(`What kind of monke are you?`)
            .setDescription(`You will be presented with a series of statements. For each one, click the button with your opinion on it.`)
            .addField('\u200b', '\u200b')
            .setFooter(`React to the message to answer questions\n${EmojiArray[0]} - Strongly agree\n${EmojiArray[1]} - Agree\n${EmojiArray[2]} - Neutral/unsure\n${EmojiArray[3]} - Disagree\n${EmojiArray[4]} - Strongly disagree\n\n${EmojiArray[5]} - Previous question`);

        var msg = await message.channel.send({embed: qEmbed}) //

        //EmojiArray.forEach(async e => await msg.react(e))
        
        await msg.react(EmojiArray[0])
        await msg.react(EmojiArray[1])
        await msg.react(EmojiArray[2])
        await msg.react(EmojiArray[3])
        await msg.react(EmojiArray[4])
        await msg.react(EmojiArray[5])
        
        await init_question()

        function random_col() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }


        function init_question(){

            const exampleEmbed = new Discord.MessageEmbed(qEmbed)
                .setTitle("Question " + (qn + 1) + " of " + (questions.length))
                .setDescription(questions[qn].question)
                .setColor(random_col())
            msg.edit(exampleEmbed)


            const filter = (reaction, user) => EmojiArray.includes(reaction.emoji.name) && user.id === message.author.id
            
            const collector = msg.createReactionCollector(filter, { max: 1, time: 60000*5, errors: ['time'] })

            collector.on('collect', (reaction, user) => {
                if (message.channel.type !== 'dm') {reaction.users.remove(user.id)}
                
                if (reaction.emoji.name === EmojiArray[0]) {next_question(1.0)}
                if (reaction.emoji.name === EmojiArray[1]) {next_question(0.5)}
                if (reaction.emoji.name === EmojiArray[2]) {next_question(0.0)}
                if (reaction.emoji.name === EmojiArray[3]) {next_question(-0.5)}
                if (reaction.emoji.name === EmojiArray[4]) {next_question(-1.0)}
                if (reaction.emoji.name === EmojiArray[5]) prev_question()
                //next_question(mult)
            });

            collector.on('end', (collection, reason) => {
                if (reason == 'time') {
                    msg.reactions.removeAll()
                    const emptyEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Quiz timed out!')
                    msg.edit(emptyEmbed)
                }
            })
        }
        

        for (var i = 0; i < questions.length; i++) {
            max_econ += Math.abs(questions[i].effect.econ)
            max_dipl += Math.abs(questions[i].effect.dipl)
            max_govt += Math.abs(questions[i].effect.govt)
            max_scty += Math.abs(questions[i].effect.scty)
        }
    
        function next_question(mult) {
            econ += mult*questions[qn].effect.econ
            dipl += mult*questions[qn].effect.dipl
            govt += mult*questions[qn].effect.govt
            scty += mult*questions[qn].effect.scty
            qn++;
            prev_answer = mult;
            if (qn < questions.length) {
                init_question();
                //results()
            } else {
                results();
            }
        }
        function prev_question() {
            if (prev_answer == null) return init_question();
            if (qn == 0) return init_question();

            qn--;
            econ -= prev_answer * questions[qn].effect.econ;
            dipl -= prev_answer * questions[qn].effect.dipl;
            govt -= prev_answer * questions[qn].effect.govt;
            scty -= prev_answer * questions[qn].effect.scty;
            prev_answer = null;
            init_question();
    
        }
        function calc_score(score,max) {
            return (100*(max+score)/(2*max)).toFixed(1)
        }
        async function results() {

            const E = calc_score(econ,max_econ)
            const D = calc_score(dipl,max_dipl)
            const G = calc_score(govt,max_govt)
            const S = calc_score(scty,max_scty)

            econArray = ["Exreme Free Bananas","Free Bananas","Slightly Free Bananas","Centrist","Slightly Work","Work","Extreme Work"]
            diplArray = ["Extreme Self","Self","Peaceful","Balanced","Slightly Tribalism","Tribalism","Chauvinist"]
            govtArray = ["Anarchist","Minarchist","Liberal","Moderate","Statist","Authoritarian","Totalitarian"]
            sctyArray = ["Homo-Sapiens","Homo habilis","Sahelantrop","Neutral","Slightly Monke","Monke","Extreme Monke"]

            function setLabel(val,ary) {
                if (val > 100) { return "" } else
                if (val > 90) { return ary[0] } else
                if (val > 75) { return ary[1] } else
                if (val > 60) { return ary[2] } else
                if (val >= 40) { return ary[3] } else
                if (val >= 25) { return ary[4] } else
                if (val >= 10) { return ary[5] } else
                if (val >= 0) { return ary[6] } else
                    {return ""}
            }

            equality  = E
            peace     = D
            liberty   = G
            progress  = S
            wealth    = (100 - equality).toFixed(1)
            might     = (100 - peace   ).toFixed(1)
            authority = (100 - liberty ).toFixed(1)
            tradition = (100 - progress).toFixed(1)

            const economiclabel = setLabel(equality, econArray)
            const diplomaticlabel = setLabel(peace, diplArray)
            const statelabel = setLabel(liberty, govtArray)
            const societylabel = setLabel(progress, sctyArray)

            ideology = ""
            ideodist = Infinity
            for (var i = 0; i < ideologies.length; i++) {
                dist = 0
                dist += Math.pow(Math.abs(ideologies[i].stats.econ - equality), 2)
                dist += Math.pow(Math.abs(ideologies[i].stats.govt - liberty), 2)
                dist += Math.pow(Math.abs(ideologies[i].stats.dipl - peace), 1.73856063)
                dist += Math.pow(Math.abs(ideologies[i].stats.scty - progress), 1.73856063)
                if (dist < ideodist) {
                    ideology = ideologies[i].name
                    ideodist = dist
                }
            }
            
        //client.commands.get('can').execute(message, economiclabel, diplomaticlabel, statelabel, societylabel, ideology);

            //await message.channel.send(economiclabel + diplomaticlabel+ statelabel+ societylabel+ ideology)
            monkeresult.execute(message, economiclabel, diplomaticlabel, statelabel, societylabel, ideology)
                .then(msg.delete())
        }

    }
}

