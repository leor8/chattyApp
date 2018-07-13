import React, {Component} from 'react';

export default class Messages extends Component {

  render() {
    var userStyle = {
      color: this.props.colour
    }

    return (
      <div className="message">
        <span className="message-username" style={userStyle}>{ this.props.user }</span>
        <span className="message-content"> { this.props.content } </span>
      </div>
    )
  }
}