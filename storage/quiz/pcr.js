const Canvas = require('canvas');
const Discord = require('discord.js')

module.exports = {
    name: 'can2',
    description: 'canvas test2!',
    aliases: [''],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    async execute(message, right, auth, prog){
        
        x_axis  = parseFloat(right)
        y_axis  = parseFloat(auth)
        z_axis  = parseFloat(prog)
    
        const canvas = Canvas.createCanvas(1850, 1600);
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#EEEEEE"
        ctx.fillRect(0, 0, 1850, 1600);
        const background = await Canvas.loadImage('./storage/quiz/compass.png')
        ctx.drawImage(background, 0, 300);
    
        var dot = canvas.getContext("2d");
        dot.beginPath();
        dot.arc(200 + (1000 * (x_axis+10)/20), 1450 - (1000 * (y_axis + 10)/20), 25, 0, 2 * Math.PI);
        dot.fillStyle = 'red';
        dot.fill();
        dot.stroke();
    
        var line = canvas.getContext("2d");
        line.beginPath();
        line.moveTo(1500, 1445 - (1000 * (z_axis + 10)/20));
        line.lineTo(1650, 1445 - (1000 * (z_axis + 10)/20));
        line.lineWidth = 10;
        line.strokeStyle = "red";
        line.stroke();
    
        ctx.font="50px sans-serif"
        ctx.textAlign="center"
        ctx.fillStyle="#222222"
        ctx.fillText("Left / Right Axis (x): " + x_axis, 1125+440, 1375-1250) //1375
        ctx.fillText("Auth / Lib Axis (y): " + y_axis, 1125+440, 1450-1250) //1450
        ctx.fillText("Prog / Con Axis (z): " + z_axis, 1125+440, 1525-1250) //1525
        
        ctx.textAlign="left"    
        ctx.font = '70px sans-serif';
        ctx.fillStyle = 'black';
        ctx.fillText(`${message.author.username}\'s`, 400, 180);// name
        ctx.font = '75px sans-serif';
        ctx.fillStyle = 'black';
        ctx.fillText(`Political Compass Results`, 400, 200+60);

        

        ctx.beginPath(); // black line around the avatar
        ctx.arc(200, 200, 156, 0, 2 * Math.PI, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));

        ctx.beginPath(); //circular window to the avatar
        ctx.arc(200, 200, 150, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        
        ctx.drawImage(avatar, 50, 50, 300, 300);
    
	    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${message.author.username}-politcompass.png`);
        message.channel.send(attachment)
    }
}