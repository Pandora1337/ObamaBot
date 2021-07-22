module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: [''],
    usage: ' ',
    example: '',
    emoji: '🏓',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: false,
    execute(message, args, client){
        message.channel.send(`--------------pong!--------------\nWebsocket heartbeat: ${client.ws.ping}ms.`);
        message.channel.send(`Checking roundtrip...`)
            .then(sent => {
                sent.edit(`Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`)
        })
    }
}