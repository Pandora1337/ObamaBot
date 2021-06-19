module.exports = {
    name: 'presence',
    description: 'Changes the presence activity of the bot',
    aliases: [''],
    usage: '\`arg[0]\` sets activity type (WATCHING, PLAYING, LISTENING TO), \`arg[1+]\` sets the activity itself',
    example: '',
    args: true,
    guildOnly: false,
    masterOnly: true,
    execute(message, args, client){
        const ACTIVITY_TYPE = args.shift().toUpperCase();
        const ACTIVITY = args.join(" ");
        client.user.setPresence({ activity: { name: ACTIVITY, type: ACTIVITY_TYPE }})
        return message.channel.send(`Status set to \`${ACTIVITY_TYPE} ${ACTIVITY}\`!`)
    }
}