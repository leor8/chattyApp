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
      messages: []
    };

    this.client = new WebSocket('ws://localhost:3001');
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
    // setTimeOut( () => {
    // const oldMessages = this.state.messages;
    // const newMessages = [...oldMessages, message];
    //this.setState( { messages: newMessages } );

    this.client.send(JSON.stringify(message));

    // this.client.onmessage(this.handleNewMessage);
    // }, 3000);
  }

  handleNewMessage(event) {
      const message = JSON.parse(event.data);
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, message];
      this.setState( { messages: newMessages } );
  }

  // updateUserName(oldName, newName) {
  //   for(let i = 0; i < this.state.messages.length; i++){
  //     if(this.state.messages[i].username === oldName) {
  //       this.state.messages[i].username = newName;
  //     }
  //   }

  //   const updatedName = this.state.messages;
  //   // console.log(updatedName);

  //   this.setState( { messages: updatedName } );
  // }

  updateCurrentUser(username) {
    const updatedCurrUser = {name: username}
    this.setState( {currentUser: updatedCurrUser} );
  }

  render() {
    return (
      <div>
        <Header />
        <MessageList messages={ this.state.messages }/>
        <ChatBar currentUser={ this.state.currentUser.name } addNewMessage={ this.addNewMessage } updateCurrentUser={ this.updateCurrentUser }/>
      </div>
    );
  }
}

export default App;
