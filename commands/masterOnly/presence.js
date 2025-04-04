const fs = require('fs');
const conf = require('../../config.json');

module.exports = {
    name: 'presence',
    description: 'Changes the presence activity of the bot',
    aliases: ['setstatus'],
    usage: 'arg[0]\` sets activity type (WATCHING, PLAYING, LISTENING, COMPETING), \`arg[1+]\` sets the activity itself',
    example: 'playing poker with buddies',
    args: true,
    guildOnly: false,
    masterOnly: true,
    execute(message, args, client){
        const aType = args.shift().toUpperCase();
        const a = args.join(" ");

        conf.ACTIVITY_TYPE = aType
        conf.ACTIVITY = a

        client.user.setPresence({ activities: [{ name: a, type: aType }]})
        fs.writeFile('./config.json', JSON.stringify(conf, null, 2), 'utf8', function writeJSON(err) {
            if (err) return console.log(err);
          });

        return message.channel.send(`Status set to \`${aType} ${a}\`!`)
    }
}