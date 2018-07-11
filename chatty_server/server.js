// server.js

const express = require('express');
const ws = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new ws.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', onConnection);

wss.on('close', (ws) => {
  console.log('Client disconnected');
});

// Method handling events
function onConnection(client) {
  client.on('message', onMessage)
  console.log('Client connected');
}

function onMessage(message) {
  const newMessage = JSON.parse(message)
  console.log(`User ${ newMessage.username } said ${ newMessage.content }`);
  broadcastMessage(newMessage);
}

function broadcastMessage(message){
  message = JSON.stringify(message);
  for(let eachClient of wss.clients){
    if(eachClient.readyState === ws.OPEN){
      console.log("New message has been broadcasted");
      eachClient.send(message);
    }
  }
}





