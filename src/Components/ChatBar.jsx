import React, {Component} from 'react';
import generateRandomId from '../randomId.js'

export default class Messages extends Component {

  render() {
    const currName = this.props.currentUser ? this.props.currentUser : 'Anonymous';

    const handleKeyPress = event => {

      if(event.key === 'Enter'){
        let messageInput = {};
        messageInput.id = generateRandomId();
        messageInput.username = currName;
        messageInput.content = event.target.value;

        event.target.value = "";

        this.props.addNewMessage(messageInput);
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={ currName }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="newMessageContent" onKeyPress={ handleKeyPress } />
      </footer>
    )
  }
}

