const disbut = require("discord-buttons");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'tic',
    description: 'tic tac toe',
    aliases: ['ttt', 'tictactoe', 't'],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    async execute(message, args, client) {

        var players = [];
        var xturn = true;
        var tttGame = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];

        for (var i = 0; i < 3; i++) {
            const b = new disbut.MessageButton().setLabel(" ").setStyle("grey");
            const b1 = new disbut.MessageButton().setLabel(" ").setStyle("grey");
            const b2 = new disbut.MessageButton().setLabel(" ").setStyle("grey");
            tttGame[0][i] = b
            tttGame[1][i] = b1
            tttGame[2][i] = b2
        }

        function updateGrid() {
            let r0 = new disbut.MessageActionRow().addComponents([
                tttGame[0][0].setID('0,0'),
                tttGame[0][1].setID('0,1'),
                tttGame[0][2].setID('0,2')
            ])
            let r1 = new disbut.MessageActionRow().addComponents([
                tttGame[1][0].setID('1,0'),
                tttGame[1][1].setID('1,1'),
                tttGame[1][2].setID('1,2')
            ])
            let r2 = new disbut.MessageActionRow().addComponents([
                tttGame[2][0].setID('2,0'),
                tttGame[2][1].setID('2,1'),
                tttGame[2][2].setID('2,2')
            ])
            return [r0, r1, r2]
        }

        let embed = new MessageEmbed()
            .setTitle('-=====- Tic Tac Toe -=====-')
            .setFooter('X goes first');

        if (args[0]) {
            const user = getUserFromMention(args[0]);
            if (!user) { return message.reply('Please use a proper mention if you want to challenge them to a game of tic-tac-toe.'); }
            players.push(message.author)
            players.push(user)
            await embed.setDescription(`${players[0]} has challenged ${players[1]}!`)
        }

        var msg = await message.channel.send(embed, { components: updateGrid() }) // 'gameboard' initialised

        const filter = (b) => b.clicker.user.bot == false
        const collector = msg.createButtonCollector(filter, { idle: 60000 * 5, errors: ['idle'] })

        collector.on('collect', async (button) => {
            const player = button.clicker.user
            if (players.length <= 1 && players[0] != player) {// adds players if there are < 2
                await players.push(player);
                await embed.setDescription(`${player.username} started a new game!`)
            } //else { //breaks if players[0] clicks again, TOO BAD!

            //    if (player == players[0]) { embed.setFooter(`It\'s ${players[1].username}\'s turn!`) }
            //    if (player == players[1]) { embed.setFooter(`It\'s ${players[0].username}\'s turn!`) }
            //}

            await checkTurn(button, player)

            let p = await button.id.split(',') // p[0] = row, p[1] = cell
            tttGame[p[0]][p[1]] = newButton

            await msg.edit(embed, { components: updateGrid() })
            await whoWin()
            //await tttGame.forEach(c => { c.setDisabled(true); });
        });

        function checkTurn(button, player) {
            if (xturn && player == players[0]) {
                xturn = false;
                button.reply.defer()
                return newButton = new disbut.MessageButton().setLabel("X").setStyle("red").setDisabled(true);
            }
            if (!xturn && player == players[1]) {
                xturn = true;
                button.reply.defer()
                return newButton = new disbut.MessageButton().setLabel("O").setStyle("green").setDisabled(true);
            }

            button.reply.send('It\`s not your turn yet!', true);
            return newButton = new disbut.MessageButton().setLabel(" ").setStyle("grey");
        }

        function getUserFromMention(mention) {
            if (!mention) return;

            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);

                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }

                return client.users.cache.get(mention);
            }
        }

        function whoWin() { // doesnt check for a win, TOO BAD!

            let embedWinner = new MessageEmbed(embed)
                //.setDescription(`${2} ${1 + 1} won! ${3}`)
                .setColor('#FFD700');
                
            // ﹉
            if (tttGame[0][0].style === 4 && tttGame[0][1].style === 4 && tttGame[0][2].style === 4) return msg.edit(embedWinner.setDescription(`${tttGame[0][0].label} won! `));
            if (tttGame[0][0].style === 3 && tttGame[0][1].style === 3 && tttGame[0][2].style === 3) return msg.edit(embedWinner.setDescription(`${tttGame[0][0].label} won! `));
            
            // ---
            if (tttGame[1][0].style === 4 && tttGame[1][1].style === 4 && tttGame[1][2].style === 4) return msg.edit(embedWinner.setDescription(`${tttGame[1][1].label} won! `));
            if (tttGame[1][0].style === 3 && tttGame[1][1].style === 3 && tttGame[1][2].style === 3) return msg.edit(embedWinner.setDescription(`${tttGame[1][1].label} won! `));
            
            // _ _ _
            if (tttGame[2][0].style === 4 && tttGame[2][1].style === 4 && tttGame[2][2].style === 4) return msg.edit(embedWinner.setDescription(`${tttGame[2][2].label} won! `));
            if (tttGame[2][0].style === 3 && tttGame[2][1].style === 3 && tttGame[2][2].style === 3) return msg.edit(embedWinner.setDescription(`${tttGame[2][2].label} won! `));

            // l..
            if (tttGame[0][0].style === 4 && tttGame[1][0].style === 4 && tttGame[2][0].style === 4) return msg.edit(embedWinner.setDescription(`${tttGame[1][0].label} won! `));
            if (tttGame[0][0].style === 3 && tttGame[1][0].style === 3 && tttGame[2][0].style === 3) return msg.edit(embedWinner.setDescription(`${tttGame[1][0].label} won! `));
            
            // .l.
            if (tttGame[0][1].style === 4 && tttGame[1][1].style === 4 && tttGame[2][1].style === 4) return msg.edit(embedWinner.setDescription(`${tttGame[1][1].label} won! `));
            if (tttGame[0][1].style === 3 && tttGame[1][1].style === 3 && tttGame[2][1].style === 3) return msg.edit(embedWinner.setDescription(`${tttGame[1][1].label} won! `));
            
            // ..l
            if (tttGame[0][2].style === 4 && tttGame[1][2].style === 4 && tttGame[2][2].style === 4) return msg.edit(embedWinner.setDescription(`${tttGame[0][2].label} won! `));
            if (tttGame[0][2].style === 3 && tttGame[1][2].style === 3 && tttGame[2][2].style === 3) return msg.edit(embedWinner.setDescription(`${tttGame[0][2].label} won! `));

            // \
            if (tttGame[0][0].style === 4 && tttGame[1][1].style === 4 && tttGame[2][2].style === 4) return msg.edit(embedWinner.setDescription(`${tttGame[1][1].label} won! `));
            if (tttGame[0][0].style === 3 && tttGame[1][1].style === 3 && tttGame[2][2].style === 3) return msg.edit(embedWinner.setDescription(`${tttGame[1][1].label} won! `));
            
            // /
            if (tttGame[0][2].style === 4 && tttGame[1][1].style === 4 && tttGame[2][0].style === 4) return msg.edit(embedWinner.setDescription(`${tttGame[1][1].label} won! `));
            if (tttGame[0][2].style === 3 && tttGame[1][1].style === 3 && tttGame[2][0].style === 3) return msg.edit(embedWinner.setDescription(`${tttGame[1][1].label} won! `));

        }

    }
}
/*
if (xturn) {
xturn = false;
}
else {
xturn = true;
}

collector.on('end', (button, reason) => {
if (reason != 'idle') return
const emptyEmbed = new MessageEmbed()
.setColor('#FF0000')
.setTitle('Quiz timed out!')
.setDescription('Try \`quiz\` command again!');

msg.edit(emptyEmbed, null)
})


function updateGrid() {
var r0 = new disbut.MessageActionRow().addComponents([
    new disbut.MessageButton().setID('0,0').setLabel(tttGame[0][0]).setStyle("grey"),
    new disbut.MessageButton().setID('0,1').setLabel(tttGame[0][1]).setStyle("grey"),
    new disbut.MessageButton().setID('0,2').setLabel(tttGame[0][2]).setStyle("grey")
])
var r1 = new disbut.MessageActionRow().addComponents([
    new disbut.MessageButton().setID('1,0').setLabel(tttGame[1][0]).setStyle("grey"),
    new disbut.MessageButton().setID('1,1').setLabel(tttGame[1][1]).setStyle("grey"),
    new disbut.MessageButton().setID('1,2').setLabel(tttGame[1][2]).setStyle("grey")
])
var r2 = new disbut.MessageActionRow().addComponents([
    new disbut.MessageButton().setID('2,0').setLabel(tttGame[2][0]).setStyle("grey"),
    new disbut.MessageButton().setID('2,1').setLabel(tttGame[2][1]).setStyle("grey"),
    new disbut.MessageButton().setID('2,2').setLabel(tttGame[2][2]).setStyle("grey")
])
return [r0, r1, r2]*/
