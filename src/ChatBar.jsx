import React, {Component} from 'react';

// Chatbar at bottom of page component
class ChatBar extends Component{

  componentDidMount() {
    const message = document.querySelector('.chatbar-message');
    const username = document.querySelector('.chatbar-username');
      
    // add a listener on the message content input 'enter' that submits the message
    message.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        this.props.sendMessage('postMessage', this.props.currentUser, message.value);
        message.value = '';
      }
    });

    // adds a listener on the user input for 'tab' or 'enter' that changes the username
    username.addEventListener("keydown", (e) => {
      if (e.keyCode === 13 || e.keyCode === 9) {
        if (username.value === '') username.value = 'Anonymous Andy';
        if (username.value !== this.props.currentUser) { this.props.setUser('postNotification', username.value); }
      }
    });
  }  

  // select all text in the user input on focus
  handleFocus = (e) => e.target.select();

  render() {
    return (
      <footer className="chatbar">
        <input name="username" className="chatbar-username" placeholder={this.props.currentUser } onFocus={this.handleFocus} />
        <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER. ' / ' commands: /giphy [search] /wave /thumbs /rockout" />
      </footer>
    )
  }
}

export default ChatBar;

