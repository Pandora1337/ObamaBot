// CANT EDIT MESSAGE ATTACHMENTS IN DISCORD API
// TEXT-ONLY VERSION WILL NEED A DATABASE

const Canvas = require('canvas');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

const name = 'poll'
const desc = 'uhhhhhhhh!'

module.exports = {
    name: name, description: desc,
    aliases: [''],
    usage: ' ',
    example: '',
    emoji: '🏓',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    nonInt: false,
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(desc)
        .addStringOption(option => option.setName('topic')
            .setDescription('The topic of the poll')
            .setRequired(true)
        )
        .addStringOption(option => option.setName('option_1')
            .setDescription('1st option for the poll')
            .setRequired(true)
        )
        .addStringOption(option => option.setName('option_2')
            .setDescription('2nd option for the poll')
            .setRequired(true)
        )
        .addStringOption(option => option.setName('option_3')
            .setDescription('3rd option for the poll')
        )
        .addStringOption(option => option.setName('option_4')
            .setDescription('4th option for the poll')
        )
        .addStringOption(option => option.setName('option_5')
            .setDescription('5th option for the poll')
        ),
    async execute(message, args, client) {

        if (message.type == 'APPLICATION_COMMAND') {
            message.author = message.user
            console.log(message.options)
            args = [
                `${message.options.getString('topic')}`, `${message.options.getString('option_1')}`, `${message.options.getString('option_2')}`,
                `${message.options.getString('option_3')}`, `${message.options.getString('option_4')}`, `${message.options.getString('option_5')}`
            ]

        } else if (message.type == 'MESSAGE_COMPONENT') {
            message.author = message.user
            console.log("oh lol " + message.customId)

            message.update({ embeds: [updateEmbed] }) // ISSUE: attachments: [] - Adds an image, without removing the original one
            return
        }
        if (args.length) { return console.log("hhhhhhh " + args) }

        const options = [];

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('pollopt1')
                    .setLabel('Option 1')
                    .setStyle('PRIMARY')
                    .setEmoji('🦧'),

                new MessageButton()
                    .setCustomId('pollopt2')
                    .setLabel('Option 2')
                    .setStyle('PRIMARY')
                    .setEmoji('🦧'),

            );
            
            const initialEmbed = new MessageEmbed()
                .setDescription('lil')

        message.reply({ embeds: [initialEmbed], components: [row] });


    }
};
