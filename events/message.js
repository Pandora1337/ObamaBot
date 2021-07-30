const { prefix, masterId, botId } = require('../config.json');
const Discord = require('discord.js');
const logger = require('../logger.js');

module.exports = {
	name: 'message',
	execute(message, client) {

        const mesSent = message.content.toLowerCase();
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (message.author.bot) return

        if (!message.content.startsWith(prefix)) {
            if (mesSent.includes('vietnam') || mesSent.includes('<@&797851474309808178>')){
                message.react('<:rising_storm_2:799965359384952852>')
            }
            if (mesSent.includes('thanks obama') || mesSent.includes('thank obama')){
                message.react('👍🏿')
            }
            if (mesSent.includes('oil')){
                message.channel.send('o_0');
            }
            if (mesSent.includes(`<@!${masterId}>`) && message.channel.type !== 'dm' && message.author.id != masterId){
                client.commands.get('mention').execute(message, args, client);
                logger.exec(`MENTION: ${args.join(' ')}`)
            }
			if (mesSent.includes(`<@!${botId}>`)){
                client.commands.get('help').execute(message, args, client);
			} return
        };
    
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
        if (!command || commandName.length <= 0) return;

        if(command.masterOnly && message.author.id !== masterId){
            return message.channel.send('Nice try, only Biden can do that!')
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('You don\'t have appropriate permissions for this!');
            }
        }
    
        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }
        
       if (command.args && !args.length) {
               return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
           }
    
      try {
        command.execute(message, args, client);
        logger.exec(`${commandName} ${args.join(' ')}`)
    } catch (error) {
        logger.error(`Error has occured while executing ${commandName} ${args.join(' ')}`)
        logger.error(error)
        message.reply('There was an error trying to execute that command!');
        }
    },
};