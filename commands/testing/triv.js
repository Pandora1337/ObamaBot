//javascript
const djs = require('discord.js')

module.exports = {
	name: 'triv',
	description: 'plays a game of trivia!',
	masterOnly: true,

//make a trivia game that takes questions from triviadb.org and users can input answers	
execute(message, args) {
		var trivia = require('triviadb');
		var trivia = new trivia.TriviaDb();
		var game = trivia.createGame();
		game.on('question', function(question) {
			message.channel.send(question.question);
		});
		game.on('answer', function(answer) {
			message.channel.send(answer);
		});
		game.on('complete', function(results) {
			message.channel.send(results);
		});
		game.start();
	}
}
