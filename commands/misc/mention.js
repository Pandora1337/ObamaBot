const { masterId } = require('../../config.json');
const logger = require('../../logger');

module.exports = {
    name: 'mention',
    description: 'Obama himself DMs Pandora with a provided message.',
    guildOnly: true,
	masterOnly: true,
    execute(message, args, client){
        const timeset = 5; //time in min

    const filter = (reaction, user) => {
        return reaction.emoji.name === '👌';// && user.id === message.author.id;
    };

    const user = client.users.cache.get(masterId);
    user.send(`\`${message.guild.name}\` in \`${message.channel.name}\`:\n\`${message.author.tag}\`: ${message.content}.\n\n To acknowledge, press on the 👌 below within ${timeset} minutes.`)
    .then(msg=> {
        msg.react('👌') 
        msg.awaitReactions(filter, {max: 2, time: timeset * 60000, errors: ['time'] 
    })
        .then(collected => {
            logger.info('Acknowledgement received')
            message.react('👌');})
        .catch(collected => {
            //message.react('❌')
            //console.log(`Acknowledgement was ignored`);
            logger.info('Acknowledgement was ignored')
        });
        })
    }
}