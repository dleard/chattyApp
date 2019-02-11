import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    return(
      <main className="messages">
        {this.props.children}
      </main>
    )
  }
}

export default MessageList;