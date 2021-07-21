module.exports = {
    name: 'prune',
    description: 'Deletes a specified number of messages from the channel! (if you have the right permission!)',
    aliases: ['p'],
	usage: '[number of messages to delete]',
    emoji: '✂️',
	example: '1',
    guildOnly: true,
	permissions: 'MANAGE_MESSAGES',
	masterOnly: false,
    execute(message, args){

        const amount = parseInt(args[0]) + 1;
        if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to prune messages in this channel! Do I have the appropriate permission?');
		});
    }
}

		