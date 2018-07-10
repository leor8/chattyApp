import React, {Component} from 'react';
import generateRandomId from '../randomId.js'

export default class Messages extends Component {
  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if(event.key === 'Enter'){
      let messageInput = {};
      messageInput.id = generateRandomId();
      messageInput.username = this.props.currentUser;
      messageInput.content = event.target.value;
      console.log(messageInput);

      //this.props.addNewMessage(messageInput);
    }
  }

  render() {
    const currName = this.props.currentUser ? this.props.currentUser : 'Anonymous';

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={ currName }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="newMessageContent" onKeyPress={ this.handleKeyPress } />
      </footer>
    )
  }
}

