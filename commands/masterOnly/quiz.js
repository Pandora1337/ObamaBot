const Math = require('mathjs');
const Discord = require('discord.js');

module.exports = {
    name: 'quiz',
    description: 'Quizes you on how monke you are!',
    aliases: '',
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    masterOnly: true,
    execute(message, args){

        var max_econ, max_dipl, max_govt, max_scty; // Max possible scores
        max_econ = max_dipl = max_govt = max_scty = 0;
        var econ, dipl, govt, scty; // User's scores
        econ = dipl = govt = scty = 0;
        var qn = 0; // Question number
        var prev_answer = null;
        //init_question();

        const eTitle = "Question " + (qn + 1) + " of " + (questions.length)
        const eQuestion = questions[qn].question

        const qEmbed = {
            title: `${eTitle}`,
            description: `${eQuestion}`,
            fields: [
              {
                name: 'React to the message to answer question',
                value: '⏪ - Strongly agree\n◀️ - Agree\n⏹️ - Neutral/unsure\n▶️ - Disagree\n⏩ - Strongly disagree'
              }
            ]
        }

        message.channel.send({embed: qEmbed})
            .then(m => {
            m.react('⏪')
            m.react('◀️')
            m.react('⏹️')
            m.react('▶️')
            m.react('⏩')
        })
            .catch(console.error());

// CODE AUTHOR = https://www.reddit.com/user/imozupa
/*
        var max_econ, max_dipl, max_govt, max_scty; // Max possible scores
        max_econ = max_dipl = max_govt = max_scty = 0;
        var econ, dipl, govt, scty; // User's scores
        econ = dipl = govt = scty = 0;
        var qn = 0; // Question number
        var prev_answer = null;
        init_question();
        for (var i = 0; i < questions.length; i++) {
            max_econ += Math.abs(questions[i].effect.econ)
            max_dipl += Math.abs(questions[i].effect.dipl)
            max_govt += Math.abs(questions[i].effect.govt)
            max_scty += Math.abs(questions[i].effect.scty)
        }
        function init_question() {
            const eTitle = "Question " + (qn + 1) + " of " + (questions.length)
            const eQuestion = questions[qn].question

            const qEmbed = {
                fields: [
                  {
                    name: 'React to the message to answer question',
                    value: '⏪ - Strongly agree\n◀️ - Agree\n⏹️ - Neutral/unsure\n▶️ - Disagree\n⏩ - Strongly disagree'
                  }
                ]
            }

            if (prev_answer == null) {

                message.channel.send({embed: qEmbed})
                    .then(m => {
                    m.react('⏪')
                    m.react('◀️')
                    m.react('⏹️')
                    m.react('▶️')
                    m.react('⏩')
                })
                    .catch(console.error());

            } else {
                message.channel.edit()
            }
    
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
            } else {
                results();
            }
        }
        function prev_question() {
            if (prev_answer == null) {
                return;
            }
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
        function results() {
            location.href = `results.html`
                + `?e=${calc_score(econ,max_econ)}`
                + `&d=${calc_score(dipl,max_dipl)}`
                + `&g=${calc_score(govt,max_govt)}`
                + `&s=${calc_score(scty,max_scty)}`
        }*/

        //message.send(`yaaa: ${results}`)

    }
}