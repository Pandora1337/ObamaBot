const fs = require('fs');
const { prefix } = require('../../config.json')
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, StreamType, createAudioResource, createAudioPlayer, VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
    name: 'voice',
    description: 'Lists and plays audio files!',
    aliases: ['v', 'audio', 'a'],
    usage: '[audio file name] <optional channel name>',
    example: 'ugly General',
    emoji: '🎤',
    args: false,
    guildOnly: true,
    permissions: '',
    masterOnly: false,
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Lists and plays audio files!')
        .addStringOption(option => option.setName('voice-line').setDescription('The voice line to play'))
        .addStringOption(option => option.setName('voice-channel').setDescription('The voice channel to send Obama to')),

    async execute(message, args, client) {

        if (message.type == 'APPLICATION_COMMAND') {
            if (message.options.getString('voice-line')) { args[0] = message.options.getString('voice-line'); }
            if (message.options.getString('voice-channel')) { var argArray = message.options.getString('voice-channel'); }
            //message.deferReply();
        } else {
            message.delete()
            if (args[1]) { var argArray = args.slice(1).join(' ') }
        }

        function sendMes(filling) {
            if (message.type == 'APPLICATION_COMMAND') { return message.reply(filling) }
            else { return message.author.send(filling) }
        }

        function getAudio() {

            const files = fs.readdirSync('./storage/audio/', { withFileTypes: true })
                .filter(dirent => dirent.isFile())
                .map(dirent => dirent.name.split('.').slice(0, -1));

            const embed = new MessageEmbed()
                .setColor('#9423E1')
                .setTitle('Here are the audio files you can play:')
                .setDescription(files.join('\n'))
                .setThumbnail('http://icons.iconarchive.com/icons/iconsmind/outline/512/Hipster-Headphones-icon.png')
                .setFooter(`Proper usage:  ${prefix}v [audio file]  <optional voice channel>`);

            return embed
        }

        if (!args[0]) { // Gets a list of audio files
            return sendMes({ embeds: [getAudio()], ephemeral: true, allowedMentions: { repliedUser: false } })
        }

        const Folder = fs.readdirSync('./storage/audio/')

        for (const file of Folder) { // recursively checks files
            let fileComponents = file.split('.');

            let fileName = fileComponents[0];
            let fileExt = fileComponents[1];

            if (args[0] == fileName) {
                var audioFile = `${args[0]}.${fileExt}`
                break
            }
        }

        if (!audioFile) return sendMes({ content: 'That is not a valid voice command! Try one of these:', embeds: [getAudio()], ephemeral: true, allowedMentions: { repliedUser: false } })

        if (argArray) {// checks if a vc is specified correctly
            const vcList = await message.guild.channels.fetch()
            var target = await vcList.find(c => c.id == parseInt(argArray) || c.name.toLowerCase() == argArray.toLowerCase() && c.type == 'GUILD_VOICE')
        }

        if (message.member.voice.channel && !target) {
            var target = await message.member.voice.channel
        }
        if (!target) return sendMes({ content: 'You need to be in a voice channel OR type voice channel name or ID after the file name!', ephemeral: true })

        const resource = createAudioResource(fs.createReadStream(`./storage/audio/${audioFile}`), { inputType: StreamType.Arbitrary, })
        const player = createAudioPlayer();

        const connection = joinVoiceChannel({
            channelId: target.id,
            guildId: message.channel.guild.id,
            adapterCreator: message.channel.guild.voiceAdapterCreator,
        })

        try {
            if (message.replied == false) { message.reply({ content: 'Obama away!', ephemeral: true }) }
            connection.subscribe(player);

            connection.on(VoiceConnectionStatus.Ready, () => {
                player.play(resource)
                //connection.voice.me.setDeaf(true)
            });

            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy()
            });
        }
        catch (error) { connection.destroy() }

    }
}