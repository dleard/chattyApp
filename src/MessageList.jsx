import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messages = this.props.messages;
    const messageList = messages.map((message) => {
      return <Message key={message.id} message={message}/>
    })
    return(
      <main className="messages">
        {messageList}
      </main>
    )
  }
}

export default MessageList;