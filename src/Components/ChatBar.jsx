import React, {Component} from 'react';
import generateRandomId from '../randomId.js'

export default class Messages extends Component {

  handleKeyPress(event) {
    event.preventDefault();

    if(event.key === 'Enter'){
      let newMessage = {};
      newMessage.id = generateRandomId;
      console.log(event.target.value);
    }
  }

  render() {
    const currName = this.props.currentUser ? this.props.currentUser : 'Anonymous';

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={ currName }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ this.handleKeyPress } />
      </footer>
    )
  }
}

