const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { botId } = require('../../config.json')

module.exports = {
    name: 'support',
    description: 'The invite to Obama\'s support server',
    usage: ' ',
    aliases: ['support'],
    example: '',
    emoji: '🙋',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: false,
    execute(message, args, client) {

        //const INVITE = `https://discord.com/oauth2/authorize?client_id=${botId}&permissions=2159406144&scope=bot%20applications.commands`;
        const SERVER = 'https://discord.com/invite/aaDWzVHS7k';

        const embed = new MessageEmbed()
            .setDescription(`For support or suggestions, join my [SERVER](${SERVER})`)
            .setColor('00FFFF')
        //.setTimestamp('2009-01-20T14:17:00.000Z');
        //.setAuthor(client.user.username, client.user.displayAvatarURL())


        let row = new MessageActionRow()
            .addComponents(
                /*
                new MessageButton()
                    .setLabel("INVITE")
                    .setURL(INVITE)
                    .setStyle("LINK"),
                    */

                new MessageButton()
                    .setLabel("SERVER")
                    .setURL(SERVER)
                    .setStyle("LINK")
            )

        if (message.channel.type !== 'DM') { embed.setColor(message.guild.me.displayHexColor) }

        message.reply({ embeds: [embed], components: [row] })
    }
}