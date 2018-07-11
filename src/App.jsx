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
      messages: [
        {
          id: generateRandomId(),
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: generateRandomId(),
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: generateRandomId(), username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addNewMessage(message) {
    // setTimeOut( () => {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState( { messages: newMessages } );
    // }, 3000);
  }

  updateUserName(oldName, newName) {
    for(let i = 0; i < this.state.messages.length; i++){
      if(this.state.messages[i].username === oldName) {
        this.state.messages[i].username = newName;
      }
    }

    const updatedName = this.state.messages;
    // console.log(updatedName);

    this.setState( { messages: updatedName } );
  }

  render() {
    return (
      <div>
        <Header />
        <MessageList messages={ this.state.messages }/>
        <ChatBar currentUser={ this.state.currentUser.name } addNewMessage={ this.addNewMessage } updateUserName={this.updateUserName}/>
      </div>
    );
  }
}

export default App;
