import React, {Component} from 'react';
import generateRandomId from '../randomId.js'

export default class Messages extends Component {

  render() {
    let currName = this.props.currentUser ? this.props.currentUser : 'Anonymous';

    const handleKeyPress = event => {
      let messageInput = {};
      if(event.target.className === 'chatbar-username' && event.key === 'Enter'){
        if(event.target.value === ""){
          messageInput.type = "postNotification";
          messageInput.content = `${ currName } has changed their username to Anonymous`;
          messageInput.name = "Anonymous";
          messageInput.id = generateRandomId();
          this.props.updateCurrentUser(messageInput);
        } else {
          messageInput.type = "postNotification";
          messageInput.content = `${ currName } has changed their username to ${ event.target.value }`;
          messageInput.name = event.target.value;
          messageInput.id = generateRandomId();
          this.props.updateCurrentUser(messageInput);
        }
        //this.props.updateUserName(currName, event.target.value);
      } else {

        if(event.key === 'Enter'){
          if(event.target.value !== "") {
            // let messageInput = {};
            messageInput.type = "postMessage";
            messageInput.id = generateRandomId();
            messageInput.username = currName;
            messageInput.content = event.target.value;

            event.target.value = "";

            this.props.addNewMessage(messageInput);
          }
        }
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={ currName } onKeyPress={ handleKeyPress }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="newMessageContent" onKeyPress={ handleKeyPress } />
      </footer>
    )
  }
}

