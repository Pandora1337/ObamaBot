module.exports = {
    name: 'move',
    description: 'move ppl to and from voice channels',
    aliases: [''],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    execute(message, args, client){
        message.member.voice.channel
    }
}