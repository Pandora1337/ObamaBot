const Math = require('mathjs');
const Discord = require('discord.js')
const questions = require('../../storage/quiz/pcq.json')
const result = require('../../storage/quiz/pcr.js')

module.exports = {
    name: 'pc',
    longName: 'Political Compass',
    description: 'Political compass test!',
    author: 'SapplyValues',
    emoji: '🧭',
    isQuiz: true,
    guildOnly: false,
    masterOnly: false,
    async execute(message, author){
        // variables
        var answers = new Object();     // Store user's answers
        var qn = 0; // Current question order
    
    
        // Populate questionsObject
    
        var questionsObject = new Object();     // Question objects with ID keys
        questions.forEach(populateQO);
    
        function populateQO(value) {
          questionsObject[value['id']] = value
        }
    
    
        // Populate & shuffle questionsOrder
        
        var questionsOrder = Object.keys(questionsObject); //Array of shuffled question IDs
        /*
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("shuffle") == "true") {
            shuffleArray(questionsOrder);
        }
    
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        }
        */
    
        // Question initialization

        EmojiArray = ['🟦','🟩','⬜','🟧','🟥','↩️']

        const qEmbed = new Discord.MessageEmbed()
            .setTitle(`Where on the compass are you?`)
            .setDescription(`You will be presented with a series of statements. For each one, click the button with your opinion on it.`)
            .addField('\u200b', '\u200b')
            .setFooter(`React to the message to answer questions\n${EmojiArray[0]} - Strongly agree\n${EmojiArray[1]} - Agree\n${EmojiArray[2]} - Neutral/unsure\n${EmojiArray[3]} - Disagree\n${EmojiArray[4]} - Strongly disagree\n\n${EmojiArray[5]} - Previous question`);

        var msg = await message.channel.send({embed: qEmbed}) //

        // EmojiArray.forEach(e => msg.react(e))
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
                .setColor(random_col());
            msg.edit(exampleEmbed)


            const filter = (reaction, user) => EmojiArray.includes(reaction.emoji.name) && user.id === author.id
            
            const collector = msg.createReactionCollector(filter, { max: 1, time: 60000*5, errors: ['time'] })

            collector.on('collect', async (reaction, user) => {
                
                if (message.channel.type !== 'dm') { reaction.users.remove(user.id) }
                
                if (reaction.emoji.name === EmojiArray[0]) { next_question(1.0) }
                if (reaction.emoji.name === EmojiArray[1]) { next_question(0.5) }
                if (reaction.emoji.name === EmojiArray[2]) { next_question(0.0) }
                if (reaction.emoji.name === EmojiArray[3]) { next_question(-0.5) }
                if (reaction.emoji.name === EmojiArray[4]) { next_question(-1.0) }
                if (reaction.emoji.name === EmojiArray[5]) { prev_question() }
            });

            collector.on('end', (collection, reason) => {
                if (reason == 'time') {
                    msg.reactions.removeAll()
                    const emptyEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Quiz timed out!')
                        .setDescription('Try \`quiz\` command again!');
                    msg.edit(emptyEmbed)
                }
            })
        }
    
    
        // Next question
    
        function next_question(answer) {
    
            answers[questionsOrder[qn]] = answer;
            qn++;
    
            if (qn < questionsOrder.length) {
                init_question();
            } else {
                results();
            }
        }
    
    
        // Previous question
    
        function prev_question() {
            if (qn == 0) return init_question()

            qn--;
    
            delete answers[questionsOrder[qn]];
            
            init_question();
        }
    
    
        // RESULTS
    
        async function results() {
            var right = 0
            var auth = 0
            var prog = 0
            
            pct = percentageCalculation(); // Calculate final results
            
            var args = ''; // prepare arguments
            for (const i in Object.keys(pct)) {
                effectName = Object.keys(pct)[i]
                //args += `${effectName}=${pct[effectName]}`

                if (effectName == 'right'){var right = pct[effectName]}
                if (effectName == 'auth'){var auth = pct[effectName]}
                if (effectName == 'prog'){var prog = pct[effectName]}
    
                /*
                var cycle = parseInt(i)
                if (cycle+1 !== Object.keys(pct).length) {
                    args += '&'
                }*/
            }
            await msg.delete()
            await result.execute(message, author, right, auth, prog)
            //await message.channel.send(result.execute(message, author, right, auth, prog))
        }
    
    
        // Calculate percentage
    
        function percentageCalculation() {
            // calc max
            var max = new Object(); // Max possible scores
            var score = new Object(); // User scores
            var pct = new Object(); // Percentages/Score
    
            // prepare
            for (const id in answers) {
                for (const effectName in questionsObject[id].effects) {
                    max[effectName] = 0
                    score[effectName] = 0
                }
            }
    
            // get max & scores
            for (const id in answers) {
                // dismiss "don't know"
                if (answers[id] !== null) {
                    for (const effectName in questionsObject[id].effects) {
                        max[effectName] += Math.abs(questionsObject[id].effects[effectName]);
                        score[effectName] += answers[id]*questionsObject[id].effects[effectName];
                    }
                }
            }
    
            // calc score
    
            for (const i in Object.keys(max)) {
                effectName = Object.keys(max)[i]
    
                if (max[effectName] > 0) {
                    pct[effectName] = (Math.round((score[effectName]*10/max[effectName]) * 100) / 100).toFixed(2);
                } else {
                    pct[effectName] = 0
                }
            }
    
            return pct;
        }

    }
}

