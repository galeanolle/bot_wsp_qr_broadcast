const express = require('express');
const path = require('path');
const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const client = new Client();

var qrstring = '';

client.on('qr', (qr) => {
	qrstring = qr;
	console.log('Client new qr', qrstring);
});

client.on('ready', () => {
    console.log('Client is ready!');
    init();
});

client.on('message', msg => {
    //if (msg.body == '!ping') {
        //msg.reply('pong');
    //}
});

client.initialize();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/send', async (req, res) => {
  console.log('Send');
  res.send('<h1>SEND</h1>')
  init();
});

app.get('/get-qr', async (req, res) => {
  try {
  	if(qrstring!=''){
  		const qrCodeImage = await qrcode.toDataURL(qrstring);
    	res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
  	}else{
  		res.send('<h1>NO QR</h1>')
  	}
    
  } catch (err) {
    console.error('Error generating QR code:', err);
    res.status(500).send('Internal Server Error');
  }
});


var phones = [

'+5491160569880',
'+5491160569880',
'+5491160569880',

];

var promotionalMsg = "";
promotionalMsg += "Hola *MAGUS BARBERIA*, cómo estás?\n\n";
promotionalMsg += "Te envio un mensaje de prueba desde nuestro 🤖 BOT WhatsAPP!\n\n";
promotionalMsg += "👉La vinculacion de tu dispositivo ha sido exitosa";

async function sendMessage(number,msg) {

  var chatId = number.substring(1) + "@c.us";
 
  console.log(chatId);
 
  const media = MessageMedia.fromFilePath('./bot.jpg');

  client.sendMessage(chatId, media, { caption: msg });

}

async function init() {

  for (var i = 0; i < phones.length; i++) {
    console.log(i,phones[i]);
    sendMessage(phones[i],promotionalMsg)
    await sleep(5000);
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.listen(port, host);

console.log('Server started att http://localhost:' + port);





