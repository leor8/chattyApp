Chatty App
=====================

A front-end focused "real-time" chatting application built with reactJs.

### Usage

Clone the project into your own device

```
git clone git@github.com:leor8/chattyApp.git
cd chattyApp
```

Install the dependencies and start the server. (Notice that there are two servers needed to be running at the same time so you will need two terminals)

```
npm install
npm start
open http://localhost:3000

cd chatty_server/
npm install
node server.js
```

### How to Use
After server started running, you will be able to chat to people connected to the save network by directing to localhost machine's IP address. You will be able to send messages and change your name. When you change your name, everyone in the chatroom will be notified. ENTER is required to both of the actions which means after entering a message you need to hit enter for it to work or after you changed your name you need to hit enter for it to update.

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
