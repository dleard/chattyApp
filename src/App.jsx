import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'AnonymousAndy',
      websocket: null,
      messages: [],
      connectedUsers: 0,
      myId: null,
      userColor: 'black'
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
      this.setUserId();
    });
  }

  componentDidUpdate() {
    this.state.websocket.onmessage = (e) => {
      console.log('RECEIVED FROM SOCKET: ' + e.data);
      const newMessage = JSON.parse(e.data)
      if (newMessage.numOnline) {
        this.setState({connectedUsers: newMessage.numOnline});
      } else {
        const messages = this.state.messages.concat(newMessage);
        this.setState({ messages });
      }
    }
  }

  sendMessage = (type, username, content) => {
    const {myId} = this.state;
    const newMessage = {type, username, content, myId};
    this.state.websocket.send(JSON.stringify(newMessage));
  }

  setUser = (type, username) => {
    console.log(`${this.state.currentUser} has changed their name to ${username}`);
    const {currentUser} = this.state;
    const notification = {type, currentUser, username};
    this.state.websocket.send(JSON.stringify(notification));
    this.setState({ currentUser: username });
  }

  setUserId = () => {
    this.state.websocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if(data.id) {
        this.setState({myId: data.id});
      }  
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar" style={{overflow: 'auto'}}>
          <a href="/" className="navbar-brand">Chatty</a>
          <h2 style={{float: 'right' }}>Online: &emsp; {this.state.connectedUsers}</h2>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} setUser={this.setUser} />
  </div>
    );
  }
}
export default App;
