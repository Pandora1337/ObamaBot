var fs = require('fs');
const { prefix } = require('../../config.json')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'voice',
    description: 'Lists and plays audio files!',
    aliases: ['v', 'audio', 'a'],
    usage: '[audio file name] <optional channel name>',
    example: 'ugly General',
    args: false,
    guildOnly: true,
    permissions: '',
    masterOnly: false,
    async execute(message, args){
        
    message.delete();

    function getAudio() {

        const files = fs.readdirSync('./storage/audio/', { withFileTypes: true })
            .filter(dirent => dirent.isFile())
            .map(dirent => dirent.name.split('.').slice(0,-1))
        // const list = 'Here are the audio files you can play:\n\n' + files.join('\n') + `\n\nProper usage: \`${prefix}v [audio file] <optional voice channel>\``
        
        const embed = new MessageEmbed()
            .setColor('#b06dad ')
            .setTitle('Here are the audio files you can play:')
            .setDescription(files.join('\n'))
            //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .setFooter(`Proper usage:  ${prefix}v [audio file]  <optional voice channel>`);
        
        return embed
    }

        if (!args.length) { // Gets a list of audio files
            return message.author.send(getAudio())
        }

        const Folder = fs.readdirSync('./storage/audio/')

        for (const file of Folder) { // recursively checks files
            let fileComponents = file.split('.');

            let fileName = fileComponents[0];
            let fileExt = fileComponents[1];

            if(args[0] == fileName){
                var  audioFile = args[0] + '.' + fileExt
            }
        }

        if (!audioFile) return message.author.send(getAudio())
    
        if (args[1]) {var argArray = args.slice(1).join(' ')}

        if (message.guild.channels.cache.some(c => c.name == `${argArray}`)){// || !message.member.voice.channel){
            var target = message.guild.channels.cache.find(c => c.name == `${argArray}`)
        } else if (message.member.voice.channel) {
            var target = message.member.voice.channel
        } else return message.author.send('You need to be in a voice channel on the server OR type voice channel name after the audio name (case sensetive)!')
            
        let connection = await target.join();
        let dispatcher = await connection.play(`./storage/audio/${audioFile}`,{volume:0.5});
        dispatcher.on('start', () => connection.voice.setDeaf(true))
        dispatcher.on('finish', () => {
            connection.disconnect();
        })
    }
}