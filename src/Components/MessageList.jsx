import React, {Component} from 'react';
import Messages from './Messages.jsx';

export default class MessageList extends Component {

  render() {

    const loadMessages = this.props.messages.map((eachMsg) => {
      return <Messages user={ eachMsg.username } content={ eachMsg.content } key={ eachMsg.id }/>;
    });

    return (
      <main className="messages">
        { loadMessages }
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    )
  }
}