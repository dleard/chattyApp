const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

const assignColor = () => {
  const colors = ['#660066', '#003366', '#9c0a0a', '#22ff57'];
  return colors[Math.floor(Math.random() * 3)]
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  const numOnline = wss.clients.size;
  const color = assignColor();
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({numOnline, color}));
  });
  

  ws.on('message', (message) => {
    console.log(message);  
    const data = JSON.parse(message);
    data.id = uuid();
    data.type = data.type === 'postMessage' ? 'incomingMessage' : 'incomingNotification';
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(data));
    });
  })

  // ws.on('message', (message) => {
  //   const receivedMessage = JSON.parse(message);
  //   receivedMessage.id = uuid();
  //   ws.send(JSON.stringify(receivedMessage));
  // });

  ws.on('close', () => console.log('Client disconnected'));
})