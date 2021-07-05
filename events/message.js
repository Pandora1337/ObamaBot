const { prefix, masterId, botId } = require('../config.json');
const Discord = require('discord.js');
const webhook = new Discord.WebhookClient('831149756406562837','ft_cV25WOi0aJCvtnai_wDfA2WK-CZyCiDdVojLBFGWxOX5_f8SLZl_OxENQQvOiq5xG');
const logger = require('../logger.js');
//const resp = require('../storage/response.json');
//const chalk = require('chalk');

module.exports = {
	name: 'message',
	execute(message, client) {

        const mesSent = message.content.toLowerCase();
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (message.author.bot) return
        /*
        if (!message.content.startsWith(prefix)) {
            if (mesSent.includes(resp) > -1){
                message.react(resp.mesReact)
                console.log(chalk.green(`[REACTED vietnam]`), `in ${message.guild.name} to ${message.author.username}!`)
            } return
        };*//**/ 

        if (!message.content.startsWith(prefix)) {
            if (mesSent.includes('vietnam') || mesSent.includes('<@&797851474309808178>')){
                message.react('<:rising_storm_2:799965359384952852>')
                //console.log(chalk.green(`[REACTED vietnam]`), `in ${message.guild.name} to ${message.author.username}!`)
            }
            if (mesSent.includes('thanks obama')){
                message.react('👍🏿')
                //console.log(chalk.green(`[REACTED thanks obama]`), `in ${message.guild.name} to ${message.author.username}!`)
            }
            if (mesSent.includes('jew') && message.channel.id === '726018347145363497'){
                webhook.send('cool it with the anti-semetic remarks');
            } 
            if((mesSent.includes('whats that') || mesSent.includes('what that')) && message.channel.id === '726018347145363497'){
                webhook.send({files: ["./storage/ducttape.jpg"]});
            }
            if((mesSent.includes('new card') || mesSent.includes('what that')) && message.channel.id === '726018347145363497'){
                webhook.send('Impressive. Very nice. Let\'s see Paul Allen\'s card.');
            }
            if (mesSent.includes('oil')){
                message.channel.send('o_0');
            }
            if (mesSent.includes(`<@!${masterId}>`) && message.channel.type !== 'dm'){
                client.commands.get('mention').execute(message, args, client);
                logger.exec(`(MENTION ${args.join(' ')}) was executed in ${message.guild.name} by ${message.author.tag}!`)
                //console.log(chalk.green(`[MENTION ${args.join(' ')}]`), `was executed in ${message.guild.name} by ${message.author.username}!`);
            }
			if (mesSent.includes(`<@!${botId}>`)){
				//message.author.send(`My prefix is \`${prefix}\`, for the list of commands, type \`${prefix}help\``)
                client.commands.get('help').execute(message, args, client);
			}return
        };
    
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
        if (!command) return;

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
        try {
            logger.exec(`(${commandName} ${args}) was executed in ${message.guild.name} by ${message.author.tag}!`)
            //console.log(chalk.green(`[${commandName} ${args.join(' ')}]`), ` was executed in ${message.guild.name} by ${message.author.username}!`);
        } 
        catch (error) {
            logger.exec(`(${commandName} ${args}) was executed in DM with ${message.author.tag}!`);
            //console.log(chalk.green(`[${commandName} ${args}]`), ` was executed in DM with ${message.author.username}!`);
        }
    } catch (error) {
        logger.error(`Error has occured while executing ${commandName} ${args}`)
        logger.error(error)
        //console.log(chalk.redBright(`Error occured while executing a command!`))
        //console.error(error);
        message.reply('There was an error trying to execute that command!');
        }
    },
};