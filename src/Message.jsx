import React, {Component} from 'react';

class Message extends Component {
  
  renderMessage = () => {
    const {message} = this.props
    if (message.type === 'incomingMessage') {
      return (
        <div className="message">
          <span style={{color: `${this.props.userColor}`}}className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      )
    } else if (message.currentUser === 'AnonymousAndy') {
      return (
        <div className="notification">
          <span className="notification-content"><strong>{message.username}</strong> has joined the chat!</span>
        </div> 
      )  
    } else {
      return (
        <div className="notification">
          <span className="notification-content"><strong>{message.currentUser}</strong> has changed their name to <strong>{message.username}</strong></span>
        </div> 
      )
    }
  }
  
  render() {  
    return(
      <div>
        {this.renderMessage()}
        
      </div>
    )
  }
}

export default Message;