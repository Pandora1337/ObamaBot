const Canvas = require('canvas');
const {MessageAttachment} = require('discord.js')

module.exports = {
    name: 'monker',
    async execute(message, author, economiclabel, diplomaticlabel, statelabel, societylabel, ideology) {//, equality, might, liberty, tradition, wealth, peace, authority, progress){
       
        /*
        wealth = (100 - equality).toFixed(1)
        might = (100 - peace).toFixed(1)
        authority = (100 - liberty).toFixed(1)
        tradition = (100 - progress).toFixed(1)
        */

        const canvas = Canvas.createCanvas(700, 570);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./storage/quiz/monke.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


        context.font = '30px sans-serif';
        context.fillStyle = 'black';
        context.fillText(`${author.username}\'s`, 140, 50);// name
        context.font = '40px sans-serif';
        context.fillStyle = 'black';
        context.fillText(`Monke Results`, 140, 85);

        context.font = '22px sans-serif';
        context.fillText(`Closest ideology match: `+ ideology, 140, 120);

        context.font = '25px sans-serif';
        context.fillText(`Economic axis: ` + economiclabel, 180, 152);
        context.fillText(`Diplomatic axis: ` + diplomaticlabel, 180, 260);
        context.fillText(`Civil axis: ` + statelabel, 180, 362);
        context.fillText(`Societal axis: ` + societylabel, 180, 472);

        
    
        context.fillStyle="#f44336"
        context.fillRect(106, 163, 4.92*equality+1, 63)
        //context.fillStyle="#00897b"
        //context.fillRect(682-5.6*wealth, 184, 5.6*wealth-2, 72)
        context.fillStyle="#ff9800"
        context.fillRect(106, 268, 4.92*might+1, 64)
        //context.fillStyle="#03a9f4"
        //context.fillRect(682-5.6*peace, 304, 5.6*peace-2, 72)
        context.fillStyle="#ffeb3b"
        context.fillRect(106, 374, 4.92*liberty+1, 64)
        //context.fillStyle="#3f51b5"
        //context.fillRect(682-5.6*authority, 424, 5.6*authority-2, 72)
        context.fillStyle="#8bc34a"
        context.fillRect(106, 480, 4.92*tradition+1, 63)
        //context.fillStyle="#9c27b0"
        //context.fillRect(682-5.6*progress, 544, 5.6*progress-2, 72)

        context.font="35px sans-serif"
        context.fillStyle="black"
        

        context.textAlign="left"
        if (equality  > 30) {context.fillText(equality + "%", 120, 207.5)}
        if (might     > 30) {context.fillText(might + "%", 120, 313.5)}
        if (liberty   > 30) {context.fillText(liberty + "%", 120, 417.5)}
        if (tradition > 30) {context.fillText(tradition + "%", 120, 523.5)}
        context.textAlign="right"
        if (wealth    > 30) {context.fillText(wealth + "%", 590, 207.5)}
        if (peace     > 30) {context.fillText(peace + "%", 590, 313.5)}
        if (authority > 30) {context.fillText(authority + "%", 590, 417.5)}
        if (progress  > 30) {context.fillText(progress + "%", 590, 523.5)}


        context.beginPath();
        context.arc(70, 70, 53, 0, 2 * Math.PI, false);
        context.fillStyle = "black";
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        context.stroke();

        const avatar = await Canvas.loadImage(author.displayAvatarURL({ format: 'jpg' }));

        context.beginPath();
        context.arc(70, 70, 50, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        
        context.drawImage(avatar, 20, 20, 100, 100);


	const attachment = new MessageAttachment(canvas.toBuffer(), `Monke-${author.username}.png`)

	return message.channel.send(attachment);
    //return await attachment

    }
}