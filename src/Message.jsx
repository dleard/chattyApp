import React, {Component} from 'react';

class Message extends Component {

  handleMessage = (message) => {
    return (
      <div style = {{color: `${message.color}`}} className="message">
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    )
  }

  handleNotification = (message) => {
    if (message.type === 'incomingNotification' && message.currentUser === 'AnonymousAndy') {
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
              <img className='embeddedImage' src={image} />
            </div>
          )
        });
        return Images;
      }
    }
  } 

  renderMessage = () => {
    const {message} = this.props;
    console.log(message);
    if (message.type === 'incomingMessage') {
      return this.handleMessage(message);
    } else { 
      return this.handleNotification(message);
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