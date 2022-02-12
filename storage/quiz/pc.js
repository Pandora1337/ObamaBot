const Math = require('mathjs');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
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
    async execute(message, author) {
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

        const qEmbed = new MessageEmbed()
            .setAuthor({ name: `${this.longName} - ${author.username}` })
            .addField('\u200b', '\u200b')
            .setFooter({ text: `To answer, click on the button with your opinion on it` });


        let b1 = new MessageButton()
            .setLabel("Strongly Agree")
            .setCustomId("1")
            .setStyle("SUCCESS");

        let b2 = new MessageButton()
            .setLabel("Agree")
            .setCustomId("0.5")
            .setStyle("SUCCESS");

        let b3 = new MessageButton()
            .setLabel("Neutral/Unsure")
            .setCustomId("0")
            .setStyle("SECONDARY");

        let b4 = new MessageButton()
            .setLabel("Disagree")
            .setCustomId("-0.5")
            .setStyle("DANGER");

        let b5 = new MessageButton()
            .setLabel("Strongly Disagree")
            .setCustomId("-1")
            .setStyle("DANGER");

        var back = new MessageButton()
            .setLabel("Previous Question")
            .setCustomId("bacc")
            .setStyle("PRIMARY")
            .setDisabled(true);

        var row1 = new MessageActionRow()
            .addComponents([b1, b2, b3, b4, b5]);


        var msg = await message.reply({
            embeds: [qEmbed],
            components: [row1],
            fetchReply: true,
            allowedMentions: { repliedUser: false }
        }) //

        await init_question()

        function random_col() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function init_question() {
            if (qn == 0) { back.setDisabled(true) }

            var row2 = new MessageActionRow()
                .addComponents([back]);

            const exampleEmbed = new MessageEmbed(qEmbed)
                .setTitle(`Question ${qn + 1} of ${questions.length}`)
                .setDescription(questions[qn].question)
                .setColor(random_col());

            msg.edit({ embeds: [exampleEmbed], components: [row1, row2] })
        }

        const collector = msg.createMessageComponentCollector({ idle: 60000 * 20, errors: ['idle'] })

        collector.on('collect', async (button) => {
            if (button.user.id != author.id) { return button.reply({content: `${button.user}, Someone else is doing this quiz!\nTry starting one yourself...`, ephemeral: true}) }
            if (button.customId == 'bacc') { prev_question(); return button.deferUpdate() }

            await next_question(button.customId)
            await button.deferUpdate()
        });

        collector.on('end', (collection, reason) => {
            if (reason != 'idle') return
            if (!msg) return
            const emptyEmbed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Quiz timed out!')
                .setDescription('Try \`quiz\` command again!');

            msg.edit({ embeds: [emptyEmbed], components: [] })
        })


        // Next question

        function next_question(answer) {

            answers[questionsOrder[qn]] = answer;
            qn++;

            back.setDisabled(false)

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

                if (effectName == 'right') { var right = pct[effectName] }
                if (effectName == 'auth') { var auth = pct[effectName] }
                if (effectName == 'prog') { var prog = pct[effectName] }

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
                        score[effectName] += answers[id] * questionsObject[id].effects[effectName];
                    }
                }
            }

            // calc score

            for (const i in Object.keys(max)) {
                effectName = Object.keys(max)[i]

                if (max[effectName] > 0) {
                    pct[effectName] = (Math.round((score[effectName] * 10 / max[effectName]) * 100) / 100).toFixed(2);
                } else {
                    pct[effectName] = 0
                }
            }

            return pct;
        }

    }
}

