const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const dotenv = require('dotenv').config()

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const users = {};

const GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(process.env.GIPHY_API);

// assigns a random color from a set of 6 colors
const assignColor = () => {
  const colors = ['#660066', '#003366', '#9c0a0a', '#22ff57', '#00e021', '#00e0c9'];
  return colors[Math.floor(Math.random() * (colors.length-1))];
}

// get gifs based on a search parameter from the giphy api
const getGifs = (searchParam) => {
  return new Promise((resolve, reject) => {
  giphy.search('gifs', {"q": searchParam})
  .then((response) => {
    resolve(response);
  })
  .catch((err) => {reject(err)});
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  const userId = uuid();
  // assign the user a random color on connection
  users[userId] = assignColor();

  // send the number of clients connected on connections
  ws.send(JSON.stringify({id: userId}));
  const numOnline = wss.clients.size;
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({numOnline}));
  });
  

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    data.id = uuid();
    // makes sure the message is sent in the sending user's color
    if (users[data.myId]) {
      data.color = users[data.myId];
    }
    
    // determine message type
    data.type = data.type === 'postMessage' ? 'incomingMessage' : 'incomingNotification';
    let isGiphy;
    if (data.content) {
      isGiphy = data.content.slice(0, 6);
    }
    // run if someone has run the /giphy command in the message content box
    if (isGiphy === '/giphy') {
      // immediately following the giphy command is the search param entered in the message content box
      const searchParam = data.content.slice(7);
      getGifs(searchParam).then((gifs) => {
        let gifUrls = [];
        // push all urls returned from the api to an array
        gifs.data.forEach((gif) => {
          gifUrls.push(gif.images.original.url);
        })
        // get a random gif from the array
        const numGifs = gifUrls.length;
        const randomNum = Math.floor(Math.random() * numGifs);
        const returnGif = gifUrls[randomNum];
        data.gifs = returnGif;

        // if no gifs are returned by the api, send a file not found gif
        if (numGifs === 0) { data.gifs = 'https://media.giphy.com/media/jpQLzgQiHbffa/giphy.gif'; }
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(data));
        });
      }).catch((err) => {
        console.log(err);
        data.gifs = "GIF search failed";
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(data));
        });
      })
    } else {
      // if not giphy command, send message content as usual
      wss.clients.forEach((client) => {
          client.send(JSON.stringify(data));
      });
    }
  })

  ws.on('close', () => {
    const numOnline = wss.clients.size;
    // send updated number of users online to all clients when a client disconnects
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({numOnline}));
    });
    console.log('Client disconnected');
  });  
})