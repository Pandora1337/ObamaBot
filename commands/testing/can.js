const Canvas = require('canvas');
const Discord = require('discord.js')

module.exports = {
    name: 'can',
    description: 'canvas test!',
    aliases: [''],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    async execute(message) {

        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.textAlign = 'center'
        ctx.font = '40px sans-serif';
        ctx.fillStyle = 'black';
        ctx.fillText(`Trivia Results`, 300, 50);


        const qNum = 120;
        const qCor = 80
        const score2nd = qCor / qNum
        const score3rd = qCor / qNum
        const score1st = qCor / qNum

        ctx.textAlign = "right"

        ctx.strokeStyle = "black"
        ctx.lineWidth = 7;
        ctx.strokeRect(75, 600, 100, -300 * score2nd);
        ctx.fillStyle = "#C0C0C0"
        ctx.fillRect(75, 600, 100, -300 * score2nd)//2nd place

        ctx.strokeRect(250, 600, 100, -300);
        ctx.fillStyle = "#FFD700"
        ctx.fillRect(250, 600, 100, -300)//1st place

        ctx.strokeRect(425, 600, 100, -300 * score3rd);
        ctx.fillStyle = "#CD7F32"
        ctx.fillRect(425, 600, 100, -300 * score3rd)//3rd place

        //ctx.fillStyle="#3f51b5"
        //ctx.fillRect(682-5.6*authority, 424, 5.6*authority-2, 72)
        //ctx.fillStyle="#9c27b0"
        //ctx.fillRect(682-5.6*progress, 544, 5.6*progress-2, 72)


        const avatarS = 150
        const avatarX = 300 - avatarS / 2;
        const avatarY = 255 - avatarS;

        await draw_avatar(message.author, avatarX, avatarY, avatarS)

        async function draw_avatar(person, avatarX, avatarY, avatarS) {

            ctx.font = '30px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center'
            ctx.fillText(`${message.author.username}`, avatarX + avatarS / 2, avatarY + avatarS + 35);// name

            ctx.beginPath(); //backdrop and outline
            ctx.arc(avatarX + avatarS / 2, avatarY + avatarS / 2, avatarS / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'black';
            ctx.stroke();

            const avatar = await Canvas.loadImage(person.displayAvatarURL({ format: 'jpg' }));

            ctx.beginPath(); // avatar window
            ctx.arc(avatarX + avatarS / 2, avatarY + avatarS / 2, avatarS / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(avatar, avatarX, avatarY, avatarS, avatarS);

        }

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${message.author.username}-huh.jpg`);

        message.channel.send(attachment);

    }
}