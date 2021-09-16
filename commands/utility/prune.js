const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'prune',
	description: 'Deletes a number of messages!',
	aliases: ['p'],
	usage: '[number of messages to delete]',
	emoji: '✂️',
	example: '1',
	guildOnly: true,
	permissions: 'MANAGE_MESSAGES',
	masterOnly: false,
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Deletes a number of messages!')
		.addIntegerOption(option => option.setName('int').setDescription('The number of messages to delete').setRequired(true)),

	execute(message, args) {

		if (message.type == 'APPLICATION_COMMAND') {
			var amount = parseInt(message.options.getInteger('int'));
			const authorPerms = message.channel.permissionsFor(message.user);
            if (!authorPerms || !authorPerms.has(this.permissions)) {
                return message.reply({ content: 'You don\'t have appropriate permissions for this!', ephemeral: true});
            }
		}
		else {
			var amount = parseInt(args[0]) + 1;
		}

		if (isNaN(amount)) {
			return message.reply({content: 'That doesn\'t seem to be a valid number.', ephemeral: true});
		} else if (amount < 1 || amount > 100) {
			return message.reply({content: 'You need to input a number between 1 and 99.', ephemeral: true});
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.reply({ content: 'There was an error trying to prune messages in this channel! Do I have the appropriate permission?', ephemeral: true});
		});
		message.reply({ content: `Deleted ${amount} messages!`, ephemeral: true, allowedMentions: { repliedUser: false } })
	}
}

