
const name = 'ping'
const desc = 'Ping!'

module.exports = {
    name: name, description: desc,
    aliases: [''],
    usage: ' ',
    example: '',
    emoji: '🏓',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: false,
    nonInt: false,
    execute(message, args, client) {
        message.reply({content: `--------------pong!--------------\nWebsocket heartbeat: ${client.ws.ping}ms.`, allowedMentions: { repliedUser: false } });
        message.channel.send(`Checking roundtrip...`)
            .then(sent => {
                sent.edit(`Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`)
            })
    }
};
