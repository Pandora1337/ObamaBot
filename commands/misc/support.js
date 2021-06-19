module.exports = {
    name: 'support',
    description: 'Sends you the invite to Obama\'s server for bot support, suggestions, or general questions!',
    aliases: [''],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: false,
    execute(message, args, client){
        message.channel.send('Here is my server: https://discord.com/invite/aaDWzVHS7k')
    }
}