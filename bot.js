//const keepAlive = require('./server');
//keepAlive
const TOKEN = process.env.dupersecret

const fs = require('fs');
const Discord = require('discord.js');
const { botId } = require('./config.json');

const client = new Discord.Client();
require("discord-buttons")(client);

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


client.login(TOKEN);