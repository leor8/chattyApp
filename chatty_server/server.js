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

// Method handling events
let userOnline = 0;

function colourIdRand() {
  var text = "";
  var possible = "ABCDEFG";

  for (var i = 0; i < 1; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return JSON.stringify(text);
}

function onConnection(client) {
  console.log("imhere");
  client.on('message', onMessage)
  userOnline += 1;
  broadcastMessage(userOnline);
  client.send(colourIdRand());
  client.on('close', onDisconnection);
}

function onDisconnection(client){
  console.log('Client disconnected');
  userOnline--;
  broadcastMessage(userOnline);
}

function onMessage(message) {
  const newMessage = JSON.parse(message)
  console.log(`User ${ newMessage.username } said ${ newMessage.content }`);
  broadcastMessage(newMessage);
}

function broadcastMessage(message){
  if(message.type === "postMessage"){
    message.type = "incomingMessage";
  } else if (message.type === "postNotification"){
    message.type = "incomingNotification";
  }

  message = JSON.stringify(message);
  for(let eachClient of wss.clients){
    if(eachClient.readyState === ws.OPEN){
      console.log(message);
      eachClient.send(message);
    }
  }
}





