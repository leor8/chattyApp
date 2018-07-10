import React, {Component} from 'react';

export default class Messages extends Component {

  render() {
    return (
      <div className="message">
        <span className="message-username">{ this.props.user }</span>
        <span className="message-content"> { this.props.content } </span>
      </div>
    )
  }
}