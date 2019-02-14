const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const users = {};

const assignColor = () => {
  const colors = ['#660066', '#003366', '#9c0a0a', '#22ff57'];
  return colors[Math.floor(Math.random() * 3)]
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  const userId = uuid();
  users[userId] = assignColor();

  ws.send(JSON.stringify({id: userId}));
  const numOnline = wss.clients.size;
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({numOnline}));
  });
  

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    data.id = uuid();
    if (users[data.myId]) {
      data.color = users[data.myId];
    }
    
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

  ws.on('close', () => {
    const numOnline = wss.clients.size;
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({numOnline}));
    });
    console.log('Client disconnected');
  });  
})