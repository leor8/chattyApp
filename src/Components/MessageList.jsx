import React, {Component} from 'react';
import Messages from './Messages.jsx';
import SystemMessage from './SystemMessage.jsx'

export default class MessageList extends Component {
  render() {
    const loadMessages = this.props.messages.map((eachMsg) => {
      if(eachMsg.type === "incomingMessage") {
        return <Messages user={ eachMsg.username } content={ eachMsg.content } colour={ eachMsg.colour } key={ eachMsg.id }/>;
      } else {
        return <SystemMessage notification={ eachMsg.content } key={ eachMsg.id }/>
      }
    });

    return (
      <main className="messages">
        { loadMessages }
      </main>
    )
  }
}