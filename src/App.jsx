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
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
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

  sendMessage = (username, content) => {
    const id = generateRandomId();
    const newMessage = {id, username, content};
    this.state.websocket.send(JSON.stringify(newMessage));
  }

  setUser = (username) => {
    this.setState({ currentUser: username});
    console.log(this.state.currentUser);
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
