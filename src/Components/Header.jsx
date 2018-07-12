import React, {Component} from 'react';

export default class Header extends Component {

  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h1 className="navbar-user-online"> { this.props.userOnline } users online </h1>
      </nav>
    )
  }
}