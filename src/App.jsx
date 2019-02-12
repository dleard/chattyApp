import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import {generateRandomId} from './utils.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'DemoDan',
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
    setTimeout(() => {
      console.log("Here comes da message!");

      const newMessage = {id: 3, username: "Michelle", content:"Hi there!"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages})
    }, 1000);
  }

  sendMessage = (username, content) => {
    const id = generateRandomId();
    const newMessage = {id, username, content};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        {/**  COMPONENTS START HERE  */}

        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage}/>
  </div>
    );
  }
}
export default App;
