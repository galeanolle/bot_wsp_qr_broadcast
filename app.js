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
promotionalMsg += "Hola, cómo estás?\n\n";
promotionalMsg += "Aún no tenés tus *GORRAS* y *REMERAS* con TU LOGO?\n";
promotionalMsg += "Somos de *UNIFORMES AUSTRAL* y te ayudamos a producirlas!\n\n";
promotionalMsg += "🔸 *Envío sin cargo* a CABA y Alrededores\n";
promotionalMsg += "🔸 *PACK* Precios x cantidad\n";
promotionalMsg += "         x6 remera+gorra a $20999 c/pack\n";
promotionalMsg += "         x12 remera+gorra a $19999 c/pack\n";
promotionalMsg += "         x24 remera+gorra a $18999 c/pack\n";
promotionalMsg += "🔸 *GORRAS* Precios x cantidad\n";
promotionalMsg += "         x6 gorras a $7650 c/u\n";
promotionalMsg += "         x12 gorras a $6125 c/u\n";
promotionalMsg += "         x24 gorras a $5100 c/u\n";
promotionalMsg += "🔸 *REMERAS* Precios x cantidad\n";
promotionalMsg += "         x6 remeras a $14999 c/u\n";
promotionalMsg += "         x12 remeras a $12999 c/u\n";
promotionalMsg += "         x24 remeras a $12499 c/u\n";
promotionalMsg += "🔸Entrega de 5 a 7 días hábiles 🕑\n";
promotionalMsg += "🔸Nos encontramos en Paraná 6388, Loma Hermosa, San Martin, Provincia de Buenos Aires. (CUIT: 27-24823910-2)\n\n";
promotionalMsg += "👉Seguínos en https://instagram.com/uniformesaustral \n";
promotionalMsg += "(Proveedores oficiales de YPF y FULL)\n\n";
promotionalMsg += "🔺Si no quieres recibir más información sobre esta promoción, responde NO GRACIAS\n";


async function sendMessage(number,msg) {

  var chatId = number.substring(1) + "@c.us";
 
  console.log(chatId);
 
  const media = MessageMedia.fromFilePath('./image.png');

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





