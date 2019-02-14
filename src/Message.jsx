import React, {Component} from 'react';

class Message extends Component {

  renderImages = () => {
    const imageRegex = /[^\ ]*\.(?:jpg|gif|png)/
    const {message} = this.props
    if (message.content) {
      const foundImages = message.content.match(imageRegex);
      if (foundImages !== null) {
        const Images = foundImages.map((image) => {
          return ( 
            <div style = {{color: `${message.color}`}} className="message">
              <span className="message-username">{message.username}</span>
              <img className='embeddedImage' src='https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/JaketheDog.png/220px-JaketheDog.png' />
            </div>
          )
        });
        return Images;
      }
    }
    
  } 

  renderMessage = () => {
    const {message} = this.props;
    if (message.type === 'incomingMessage') {
      return (
        <div style = {{color: `${message.color}`}} className="message">
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      )
    } else if (message.type === 'incomingNotification' && message.currentUser === 'AnonymousAndy') {
      return (
        <div className="notification">
          <span className="notification-content"><strong>{message.username}</strong> has joined the chat!</span>
        </div> 
      )  
    } else if (message.type === 'incomingNotification' && message.currentUser !== 'AnonymousAndy') {
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
        {this.renderImages()}
      </div>
    )
  }
}

export default Message;