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
      messages: [],
      connectedUsers: 0
    };
  }

  connect = () => {
    return new Promise((resolve, reject) => {
      const chattySocket = new WebSocket('ws://localhost:3001');
        chattySocket.onopen = () => {
            resolve(chattySocket);
        };
        chattySocket.onerror = (err) => {
            reject(err);
        };
    });
  }
  

  componentDidMount() {
    console.log("<App /> Mounted");
    this.connect().then((chattySocket) => {
      this.setState({ websocket: chattySocket });
      console.log(`Connected to Websocket server: ${chattySocket.url}`);
      this.setConnectedUsers();
    });
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

  setConnectedUsers = () => {
    this.state.websocket.onmessage = (e) => {
      this.setState({connectedUsers: e.data});
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar" style={{overflow: 'auto'}}>
          <a href="/" className="navbar-brand">Chatty</a>
          <h2 style={{float: 'right'}}>{this.state.connectedUsers}</h2> <h2 style={{float: 'right' }}>Online: &emsp;</h2>
        </nav>
        {/**  COMPONENTS START HERE  */}

        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} setUser={this.setUser} />
  </div>
    );
  }
}
export default App;
