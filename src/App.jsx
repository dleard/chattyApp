import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        {/**  COMPONENTS START HERE  */}

        <MessageList>
          <Message />
        </MessageList>
        <ChatBar />
  </div>
    );
  }
}
export default App;
