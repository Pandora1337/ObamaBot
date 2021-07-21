const disbut = require("discord-buttons");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'but',
    description: 'buttons?!',
    aliases: [''],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    execute(message, args, client) {

        let button1 = new disbut.MessageButton()
            .setLabel("Strongly agree")
            .setID("1")
            .setStyle("green");

        let button2 = new disbut.MessageButton()
            .setLabel(" agree")
            .setID("0.5")
            .setStyle("green");

        let button3 = new disbut.MessageButton()
            .setLabel("neutral")
            .setID("0")
            .setStyle("grey");

        let button4 = new disbut.MessageButton()
            .setLabel("disagree")
            .setID("-0.5")
            .setStyle("red");

        let button5 = new disbut.MessageButton()
            .setLabel("Strongly disagree")
            .setID("-1")
            .setStyle("red");

        let button6 = new disbut.MessageButton()
            .setLabel("fam go bac")
            .setID("bacc")
            .setStyle("blurple");
        
            
        let bb = new disbut.MessageButton()
        .setLabel("yah")
        .setID("bacc2")
        .setStyle("green");



        let row = new disbut.MessageActionRow()
            .addComponents(button1, button2, button3, button4, button5);
        let row2 = new disbut.MessageActionRow()
            .addComponent(button6);
        

        let embed = new MessageEmbed()
            .setDescription(' bruh ');

        client.on('clickButton', async (button) => {

            if (button.clicker.user.id != message.author.id) return button.reply.think(true)
            if (button.id === 'bacc') return await button.message.edit('a', null)

            const math = button.id * 10;
            embed.setDescription(`${button.id} is invoked by ${button.clicker.user.username}. math: ${math}`)

            await button.message.edit(embed)
            await button.reply.defer()

        });


        message.channel.send(embed, {components: [row, row2]} );

    }
}