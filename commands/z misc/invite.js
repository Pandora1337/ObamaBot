module.exports = {
    name: 'invite',
    description: 'Sends you the invite link for Obama, make sure all permissions are granted!',
    usage: '',
    example: '',
    emoji: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    execute(message, args, client){
        message.channel.send('Here is my link: ')
    }
}