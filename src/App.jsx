import React, {Component} from 'react';
import MessageList from './Components/MessageList.jsx';
import Header from './Components/Header.jsx';
import ChatBar from './Components/ChatBar.jsx';
import generateRandomId from './randomId.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "", colour: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      userOnline: 0,
      messages: []
    };

    this.colour = "";
    this.client = new WebSocket(`ws://${ window.location.hostname }:3001`);
    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.onConnection = this.onConnection.bind(this);
    this.assignColour = this.assignColour.bind(this);
    this.colourIdRand = this.colourIdRand.bind(this);
  }

  // component did mount will be responsible for checking if connected to the server
  componentDidMount() {
   this.client.addEventListener('open', this.onConnection);
  }

  // onConnection will greet the user and listen for messages
  onConnection(event) {
    const newUser = {
      name: "",
      colour: this.assignColour(this.colourIdRand())
    };
    this.setState( {currentUser: newUser} );
    this.client.addEventListener('message', this.handleNewMessage);
  }

  // When user enters a message
  addNewMessage(message) {
    const currUser = { name: message.name, colour: message.colour};
    this.setState( { currentUser: currUser } );
    this.client.send(JSON.stringify(message));
  }

  //When user changes his/her name
  updateCurrentUser(username) {
    this.client.send(JSON.stringify(username));
  }

  // Handle all the messages coming in, based on the tyoe of the message and behave differently
  handleNewMessage(event) {
    const message = JSON.parse(event.data);
    if(message.type === "incomingMessage") {
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, message];
      this.colour = message.colour;
      this.setState( { messages: newMessages } );
    } else if (message.type === "incomingNotification") {
      // const currUser = { name: message.name };
      // this.setState( { currentUser: currUser } );
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, message];
      this.setState( { messages: newMessages } );
    } else if (typeof message === 'number'){
      this.setState( { userOnline: message } );
    }
  }

  colourIdRand() {
    var text = '';
    var possible = 'ABCDEFG';

    for (var i = 0; i < 1; i++)
      text = possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


  assignColour(message) {
    if(message === 'A'){
      return'red';
    } else if (message === 'B'){
      return 'blue';
    } else if (message === 'C'){
      return 'red';
    } else if (message === 'D'){
      return 'gray';
    } else if (message === 'E'){
      return 'purple';
    } else if (message === 'F'){
      return 'green';
    } else {
      return 'black';
    }
  }


  render() {
    // console.log("currentUser colour is: ", this.state.currentUser.colour);
    // console.log("other user colour is: ", this.colour);
    return (
      <div>
        <Header userOnline={ this.state.userOnline }/>
        <MessageList messages={ this.state.messages } currentUser={ this.state.currentUser } colour={this.colour}/>
        <ChatBar currentUser={ this.state.currentUser } addNewMessage={ this.addNewMessage } updateCurrentUser={ this.updateCurrentUser }/>
      </div>
    );
  }
}

export default App;
