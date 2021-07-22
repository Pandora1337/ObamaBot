const disbut = require("discord-buttons");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'tic',
    description: 'tic tac toe',
    aliases: ['ttt', 'tictactoe'],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    async execute(message, args, client) {

        var r0 = new disbut.MessageActionRow()
        var r1 = new disbut.MessageActionRow()
        var r2 = new disbut.MessageActionRow()

        async function initGrid() {
            for (var i = 1; i < 4; i++) {
                let b = new disbut.MessageButton()
                    .setLabel(" ")
                    .setID(i)
                    .setStyle("grey");

                await r0.addComponent(b.setID(10 + i));
                await r1.addComponent(b.setID(20 + i));
                await r2.addComponent(b.setID(30 + i));
            }
        }

        await initGrid()

        let bo = new disbut.MessageButton()
            .setLabel("O")
            .setStyle("green");


        let embed = new MessageEmbed()
            .setDescription(' bruh ');

        client.on('clickButton', async (button) => {

            if (button.clicker.user.id != message.author.id) return button.reply.think(true)
            if (button.id === 'bacc') return await button.message.edit('a', bb)

            await updateGrid(button)

            embed.setDescription(`${button.id} is invoked by ${button.clicker.user.username}.`)

            await button.reply.defer()

        });


        async function updateGrid(interaction) {
            const message = interaction.message;

            let xs = 0, os = 0;

            for (let actionRow of message.components) {
                for (let button of actionRow.components) {
                    if (button.label === 'X') xs++;
                    else if (button.label === 'O') os++;
                }
            }

            const xs_turn = xs <= os;
            const i = parseInt(interaction.customID[3]),
                j = parseInt(interaction.customID[4]);

            const buttonPressed = message.components[i - 1].components[j - 1];

            if (buttonPressed.label !== '_')
                return await interaction.reply("Someone already played there!", { ephemeral: true });

            buttonPressed.label = xs_turn ? 'X' : 'O';
            buttonPressed.style = xs_turn ? "SUCCESS" : "DANGER";

            const styleToNumber = style => style === "SECONDARY" ? 2 : style === "SUCCESS" ? 3 : 4;


            const components = []

            for (let actionRow of message.components) {
                components.push({ type: 1, components: [] });
                for (let button of actionRow.components) {
                    components[components.length - 1].components.push({ type: 2, label: button.label, style: styleToNumber(button.style), custom_id: button.customID });
                }
            }

            message.edit({ components: components })
        }


        await message.channel.send(embed, { components: [r0, r1, r2] });

    }
}