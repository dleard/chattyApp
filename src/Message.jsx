import React, {Component} from 'react';

// Individual messages
class Message extends Component {

  // handle a '/giphy' command
  handleGiphy = (message) => {
    const returnGif = message.gifs;
    return <img className='embeddedImage' src={returnGif} />    
  }

  // handle the different types of content that can be rendered
  handleContent = (message) => {
    // if ws has passed a giphy gif
    if (message.gifs) {
      return this.handleGiphy(message);
    }
    const msg = message.content.slice(1).toLowerCase();
    // "/" commands other than /giphy
    if (message.content[0] === '/') {
      let cmd;
      switch(msg) {
        case 'wave':
          cmd = String.fromCodePoint(0x1f44b);
          break;
        case 'rockout':
          cmd = String.fromCodePoint(0x1f918);
          break;   
        case 'thumbs':
          cmd = String.fromCodePoint(0x1f44d);
          break;
        default:
          return <span className="message-content">Invalid '/' command</span>
      }
      return <span className="message-content"><h1 style={{fontSize: '50px'}}>{cmd}</h1></span>
    }
    // If no special commands issued, just render the contents of the message
    return <span className="message-content">{message.content}</span>
  }

  // handles the entirety of the message, including username
  handleMessage = (message) => {
    return (
      <div style = {{color: `${message.color}`}} className="message">
        <span className="message-username">{message.username}</span>
        {this.handleContent(message)}
      </div>
    )
  }

  // handles the message if the type is incomingNotification
  handleNotification = (message) => {
    // Display 'user has joined the chat' if it is their first time changing their name
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
  
  // If a user's message contains an image URL, render that image below their message
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

  // Message renderer
  renderMessage = () => {
    const {message} = this.props;
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