const { masterId, botId } = require('../config.json');
const logger = require('../logger.js');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {

        if (message.author.bot || !message.content) return

        //const args = mesSent.trim().split(/ +/);
        //var mention = args.shift()
        //const args = message.content.slice(prefix.length).trim().split(/ +/);

        /* check in March
        if (mesSent.includes('thanks') || mesSent.includes('thank')) {
            return message.react('👍🏿')
        }
        */

        const mesSent = message.content.toLowerCase();

        const botMention1 = `<@${botId}>`;
        const botMention2 = `<@!${botId}>`;

             if ( mesSent.startsWith(botMention1) ) { var proc = mesSent.split(botMention1) }
        else if ( mesSent.startsWith(botMention2) ) { var proc = mesSent.split(botMention2) }
        else return

        const args = proc[1].split(/ +/)

        if ( args[0] == '' ) args.shift()

        const commandName = args.shift()
        

        if (commandName == '') {
            return client.commands.get('help').execute(message, args, client);
        }

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command || commandName.length <= 0) return;

        if (command.masterOnly && message.author.id !== masterId) {
            return message.channel.send('Nice try, only Biden can do that!')
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('You don\'t have appropriate permissions for this!');
            }
        }

        if (command.guildOnly && message.channel.type === 'DM') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        if (command.args && !args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        try {
            command.execute(message, args, client);
            logger.exec(`${command.name} ${args.join(' ')}`)
        } catch (error) {
            //console.error(error)
            logger.error(`Error has occured while executing ${commandName} ${args.join(' ')}`)
            logger.error(error)
            message.reply('There was an error trying to execute that command!');
        }
    }
};