//const keepAlive = require('./server');
//keepAlive

const fs = require('fs');
const Discord = require('discord.js');
const { botId } = require('./config.json');
//const logger = require('./logger.js')

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"], partials: ["CHANNEL"] });


//top.gg + DBL updates
const { AutoPoster } = require("topgg-autoposter");
const poster = new AutoPoster(process.env.topToken, client);

const DBL = require("./storage/DBLupdate.js")
const tbl = new DBL.get(process.env.dblToken)

poster.on('posted', (stats) => { // ran when succesfully posted
    //console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`)

    memberCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    tbl.post(client.guilds.cache.size, memberCount)
})


//quizzes collection
client.quizes = new Discord.Collection();

const Folder = fs.readdirSync('./storage/quiz/')

for (const file of Folder) {
    if (file.endsWith('.js')) {
        const quiz = require(`./storage/quiz/${file}`);
        client.quizes.set(quiz.name, quiz);
    }
}

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


client.login(process.env.dupersecret);