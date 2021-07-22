const express = require('express');
const logger = require('./logger.js');
const fs = require('fs');
var app = express();

app.get('/', (req, res)=>{
    res.send(`Your bot is alive!\n`)
})

app.get('/logy', function (req, res) {

  fs.readFile('./logs/weblog.log', (err, data) => {
    if (err) { console.log(err); res.end() } 
    else {
      res.write(data); 
      res.end();
    }
  })


});

function keepAlive(){
    app.listen(3000, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive();