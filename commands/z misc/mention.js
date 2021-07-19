const { masterId } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mention',
    description: 'sends a DM to bot owner when mentioned on a server',
    guildOnly: true,
	masterOnly: true,
    execute(message, args, client){
        const timeset = 5; //time in min

    const filter = (reaction, user) => {
        return reaction.emoji.name === '👌';// && user.id === message.author.id;
    };

    const embed = new MessageEmbed()
        .setColor('#9423E1')
        .setTitle(`\`${message.guild.name}\` in \`${message.channel.name}\`, \`${message.author.tag}\`:`)
        .setDescription(`--> ${message.content}`)
        .setFooter(`To acknowledge, press on the 👌 below within ${timeset} minutes.`)

    const user = client.users.cache.get(masterId);
    //user.send(`\`${message.guild.name}\` in \`${message.channel.name}\`:\n\`${message.author.tag}\`: ${message.content}.\n\n To acknowledge, press on the 👌 below within ${timeset} minutes.`)
    user.send(embed)
    .then(msg=> {
        msg.react('👌') 
        msg.awaitReactions(filter, {max: 2, time: timeset * 60000, errors: ['time'] 
    })
        .then(collected => {
            console.log('Acknowledgement received')
            message.react('👌');})
        .catch(collected => {
            //message.react('❌')
            //console.log(`Acknowledgement was ignored`);
            console.log('Acknowledgement was ignored')
        });
        })
    }
}