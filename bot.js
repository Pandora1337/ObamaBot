const fs = require('fs');
const Discord = require('discord.js');
//const logger = require('./logger.js')

const topToken = process.env.topToken; 
const dblToken = process.env.dblToken;
const botToken = require('./token.json').botToken //process.env.dupersecret;

module.exports = {botToken}

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"], partials: ["CHANNEL"] });

/*
//top.gg + DBL updates
const { AutoPoster } = require("topgg-autoposter");
const poster = new AutoPoster(topToken, client);

const DBL = require("./storage/DBLupdate.js")
const tbl = new DBL.get(dblToken) //process.env.dblToken

poster.on('posted', (stats) => { // ran when succesfully posted
    //logger.info(`Posted stats to Top.gg | ${stats.serverCount} servers`)

    memberCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    tbl.post(client.guilds.cache.size, memberCount)
})
*/

//events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}


//commands collection
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}


//quizzes collection & options
client.quizes = new Discord.Collection();
const qOpt = []
const Folder = fs.readdirSync('./storage/quiz/')

for (const file of Folder) {
    if (!file.endsWith('.js')) continue
    const quiz = require(`./storage/quiz/${file}`);

    if (!quiz.isQuiz) continue
    client.quizes.set(quiz.name, quiz);

    qOpt.push({ name: quiz.longName, value: quiz.name })
}
client.commands.get('quiz').data.options[0].choices = qOpt


//voicelines options
const audioFolder = fs.readdirSync('./storage/audio/', { withFileTypes: true })
const vc = []

for (const file of audioFolder) {
    filename = file.name.split('.').slice(0, -1).toString()
    vc.push({ name: filename, value: filename })
}
client.commands.get('voice').data.options[0].choices = vc


client.login(botToken);