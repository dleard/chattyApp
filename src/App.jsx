import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import {generateRandomId} from './utils.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'AnonymousAndy',
      websocket: null,
      messages: []
    };
  }

  componentDidMount() {
    console.log("<App /> Mounted");
    const chattySocket = new WebSocket('ws://localhost:3001');
    this.setState({ websocket: chattySocket });
    console.log(`Connected to Websocket server: ${chattySocket.url}`);
  }

  componentDidUpdate() {
    this.state.websocket.onmessage = (e) => {
      console.log('RECEIVED FROM SOCKET: ' + e.data);
      const newMessage = JSON.parse(e.data)
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages});
    }
  }

  sendMessage = (type, username, content) => {
    const id = generateRandomId();
    const newMessage = {type, id, username, content};
    this.state.websocket.send(JSON.stringify(newMessage));
  }

  setUser = (type, username) => {
    console.log(`${this.state.currentUser} has changed their name to ${username}`);
    const {currentUser} = this.state;
    const notification = {type, currentUser, username};
    this.state.websocket.send(JSON.stringify(notification));
    this.setState({ currentUser: username });
  }

  render() {
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        {/**  COMPONENTS START HERE  */}

        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} setUser={this.setUser} />
  </div>
    );
  }
}
export default App;
