import React, {Component} from 'react';
import Messages from './Messages.jsx';
import SystemMessage from './SystemMessage.jsx'

export default class MessageList extends Component {
  render() {
    // console.log("current user colour is: ", this.props.currentUser.colour);
    const loadMessages = this.props.messages.map((eachMsg) => {
      if(eachMsg.type === "incomingMessage") {
        // if(this.props.colour === ''){
        //   return <Messages user={ eachMsg.username } content={ eachMsg.content } colour={ this.props.currentUser.colour } key={ eachMsg.id }/>;
        // } else {
        //   return <Messages user={ eachMsg.username } content={ eachMsg.content } colour={ this.props.colour } key={ eachMsg.id }/>;
        // }
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