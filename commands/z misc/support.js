const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'support',
    description: 'Sends you the invites to Obama and his server. Use this to update bot permissions.',
    usage: ' ',
    aliases: ['invite', 's'],
    example: '',
    emoji: '🙋',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: false,
    execute(message, args, client){

        const embed = new MessageEmbed()
            .setDescription('Make sure all my permissions are granted with my [INVITE](https://discord.com/oauth2/authorize?client_id=826106135689560084&permissions=2159406144&scope=bot%20applications.commands)'
                + '\n\nFor support or suggestions, join my [SERVER](https://discord.com/invite/aaDWzVHS7k)')
            .setColor('00FFFF')
            //.setTimestamp('2009-01-20T14:17:00.000Z');
            //.setAuthor(client.user.username, client.user.displayAvatarURL())

        if (message.channel.type !== 'dm') {embed.setColor(message.guild.me.displayHexColor)}
        
        message.channel.send(embed)
    }
}