import React, {Component} from 'react';

export default class SystemMessage extends Component {

  render() {

    return (
      <div className="message system">
        {this.props.notification}
      </div>
    )
  }
}