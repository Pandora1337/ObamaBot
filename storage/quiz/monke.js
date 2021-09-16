const Math = require('mathjs');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const questions = require('./monkeq.json')
const ideologies = require('./monkei.json')
const monkeresult = require('./monker.js')

module.exports = {
    name: 'monke',
    longName: 'MonkeValues',
    description: 'Quizzes you on how monke you are!',
    author: 'u/imozupa',
    emoji: '🦧',
    isQuiz: true,
    guildOnly: false,
    masterOnly: false,
    async execute(message, author) {
        // CODE AUTHOR = https://www.reddit.com/user/imozupa

        var max_econ, max_dipl, max_govt, max_scty; // Max possible scores
        max_econ = max_dipl = max_govt = max_scty = 0;
        var econ, dipl, govt, scty; // User's scores
        econ = dipl = govt = scty = 0;
        var qn = 0; // Question number
        var prev_answer = null;

        const qEmbed = new MessageEmbed()
            .setAuthor(this.longName)
            .addField('\u200b', '\u200b')
            .setFooter(`To answer, click on the button with your opinion on it`);

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
            .addComponents(b1, b2, b3, b4, b5);

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
                .addComponents(back);

            const exampleEmbed = new MessageEmbed(qEmbed)
                .setTitle(`Question ${qn + 1} of ${questions.length}`)
                .setDescription(questions[qn].question)
                .setColor(random_col())

            msg.edit({ embeds: [exampleEmbed], components: [row1, row2] })
        }

        const collector = msg.createMessageComponentCollector({ idle: 60000 * 20, errors: ['idle'] })

        collector.on('collect', async (button) => {
            if (button.user.id !== author.id) { return button.reply.send(`${button.user}, Someone else is doing this quiz!\nTry starting one yourself...`, true) }
            if (button.customId == 'bacc') { prev_question(); return button.deferUpdate() }

            await next_question(button.customId)
            await button.deferUpdate()
        });

        collector.on('end', (button, reason) => {
            if (reason != 'idle') return
            if (!msg) return
            const emptyEmbed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Quiz timed out!')
                .setDescription('Try \`quiz\` command again!');

            msg.edit({ embeds: [emptyEmbed], components: [] })
        })
        //}


        for (var i = 0; i < questions.length; i++) {
            max_econ += Math.abs(questions[i].effect.econ)
            max_dipl += Math.abs(questions[i].effect.dipl)
            max_govt += Math.abs(questions[i].effect.govt)
            max_scty += Math.abs(questions[i].effect.scty)
        }

        function next_question(mult) {
            econ += mult * questions[qn].effect.econ
            dipl += mult * questions[qn].effect.dipl
            govt += mult * questions[qn].effect.govt
            scty += mult * questions[qn].effect.scty
            qn++;
            prev_answer = mult;
            back.setDisabled(false)
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
            back.setDisabled(true)
            init_question();

        }
        function calc_score(score, max) {
            return (100 * (max + score) / (2 * max)).toFixed(1)
        }
        async function results() {

            const E = calc_score(econ, max_econ)
            const D = calc_score(dipl, max_dipl)
            const G = calc_score(govt, max_govt)
            const S = calc_score(scty, max_scty)

            econArray = ["Exreme Free Bananas", "Free Bananas", "Slightly Free Bananas", "Centrist", "Slightly Work", "Work", "Extreme Work"]
            diplArray = ["Extreme Self", "Self", "Peaceful", "Balanced", "Slightly Tribalism", "Tribalism", "Chauvinist"]
            govtArray = ["Anarchist", "Minarchist", "Liberal", "Moderate", "Statist", "Authoritarian", "Totalitarian"]
            sctyArray = ["Homo-Sapiens", "Homo habilis", "Sahelantrop", "Neutral", "Slightly Monke", "Monke", "Extreme Monke"]

            function setLabel(val, ary) {
                if (val > 100) { return "" } else
                if (val > 90)  { return ary[0] } else
                if (val > 75)  { return ary[1] } else
                if (val > 60)  { return ary[2] } else
                if (val >= 40) { return ary[3] } else
                if (val >= 25) { return ary[4] } else
                if (val >= 10) { return ary[5] } else
                if (val >= 0)  { return ary[6] } else { return "" }
            }

            equality = E
            peace = D
            liberty = G
            progress = S
            wealth = (100 - equality).toFixed(1)
            might = (100 - peace).toFixed(1)
            authority = (100 - liberty).toFixed(1)
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

            await msg.delete()
            await monkeresult.execute(message, author, economiclabel, diplomaticlabel, statelabel, societylabel, ideology)
        }

    }
}

