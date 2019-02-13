import React, {Component} from 'react';

class ChatBar extends Component{

  componentDidMount() {
    const message = document.querySelector('.chatbar-message');
    const username = document.querySelector('.chatbar-username');
      
    message.addEventListener("keyup", (e) => {
      event.preventDefault();
      
      if (e.keyCode === 13) {
        this.props.sendMessage(this.props.currentUser, message.value);
        message.value = '';
      }
    });

    username.addEventListener("keyup", (e) => {
      event.preventDefault();
      
      if (e.keyCode === 13) {
        if (username.value === '') username.value = 'Anonymous Andy';
        this.props.setUser(username.value);
      }
    });
  }  

  handleFocus = (e) => e.target.select();

  render() {
    return (
      <footer className="chatbar">
        <input name="username" className="chatbar-username" placeholder={this.props.currentUser } onFocus={this.handleFocus} />
        <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;

