import React, {Component} from 'react';

class ChatBar extends Component{

  componentDidMount() {
    const input = document.querySelector('.chatbar-message');
    const username = document.querySelector('.chatbar-username');
      
    input.addEventListener("keyup", (e) => {
      event.preventDefault();
      
      if (e.keyCode === 13) {
        if (username.value === '') username.value = 'Anonymous Andy';
        this.props.sendMessage(username.value, input.value);
        username.value  = '';
        input.value = '';
      }
    });
  }  

  render() {
    return (
      <footer className="chatbar">
        <input name="username" className="chatbar-username" placeholder="Your Name (Optional)" />
        <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;

