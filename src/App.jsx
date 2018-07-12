import React, {Component} from 'react';
import MessageList from './Components/MessageList.jsx';
import Header from './Components/Header.jsx';
import ChatBar from './Components/ChatBar.jsx';
import generateRandomId from './randomId.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      userOnline: 0,
      messages: []
    };

    this.client = new WebSocket(`ws://${ window.location.hostname }:3001`);
    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.onConnection = this.onConnection.bind(this);
  }

  componentDidMount() {
   this.client.addEventListener('open', this.onConnection);
  }

  onConnection(event) {
    console.log(`Greetings! User.`);
    this.client.addEventListener('message', this.handleNewMessage);
  }

  addNewMessage(message) {
    this.client.send(JSON.stringify(message));
  }

  updateCurrentUser(username) {
    this.client.send(JSON.stringify(username));
  }


  handleNewMessage(event) {
      const message = JSON.parse(event.data);

      if(message.type === "incomingMessage") {
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, message];
        this.setState( { messages: newMessages } );
      } else if (message.type === "incomingNotification") {
        const currUser = { name: message.name };
        this.setState( { currentUser: currUser } );
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, message];
        this.setState( { currentUser: currUser } );
        this.setState( { messages: newMessages } );
      } else {
        this.setState( { userOnline: message } );
      }
  }


  render() {
    return (
      <div>
        <Header userOnline={ this.state.userOnline }/>
        <MessageList messages={ this.state.messages } currUser={ this.state.currentUser.name }/>
        <ChatBar currentUser={ this.state.currentUser.name } addNewMessage={ this.addNewMessage } updateCurrentUser={ this.updateCurrentUser }/>
      </div>
    );
  }
}

export default App;
