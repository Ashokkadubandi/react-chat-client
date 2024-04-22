import React, { Component } from "react";
import Chat from "./components/Chat";
import io from "socket.io-client";

import "./App.css";

const accounts = ["John", "Bob", "David"];

let INDEX = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      text: "",
    };
    this.chatContainerRef = React.createRef();
    this.socket = io("https://react-chat-one-roan.vercel.app/");

    this.socket.on("receive_message", (data) => {
      this.renderMessages(data);
    });
  }
  componentDidMount() {
    console.log("component render");
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if new message has been added
    if (prevState.chatList.length !== this.state.chatList.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    if (this.chatContainerRef.current) {
      this.chatContainerRef.current.scrollTop = this.chatContainerRef.current.scrollHeight;
    }
  }
  renderMessages = (text) => {
    let len = accounts.length;
    let randomName = Math.random() * len;
    let randomIndex = Math.ceil(randomName);
    let chatMinute = new Date();

    let dateString =
      String(chatMinute.getHours()) + ":" + String(chatMinute.getMinutes());
    const chatBox = {
      id: (INDEX += 1),
      name: accounts[randomIndex - 1],
      message: text,
      time: dateString,
    };
    this.setState((pre) => ({
      chatList: [...pre.chatList, chatBox],
      text: "",
    }));
  };

  sendMessage = () => {
    const { text } = this.state;
    this.socket.emit("send_message", { message: text });
  };

  pushToChat = (event) => {
    const { text } = this.state;
    if (event.key === "Enter") {
      this.sendMessage();
      this.renderMessages(text);
    }
  };

  changeChat = (event) => {
    this.setState({ text: event.target.value });
  };

  render() {
    const { chatList, text } = this.state;
    return (
      <div className="react-chat">
        <ul
          className="top-messages"
          ref={this.chatContainerRef}
          style={{ overflowY: "auto", maxHeight: "400px" }}
        >
          {chatList.map((each) => (
            <Chat key={each.id} each={each} />
          ))}
        </ul>
        <div className="footer-input-section">
          <input
            type="text"
            className="chat-inp"
            onKeyUp={this.pushToChat}
            onChange={this.changeChat}
            value={text}
          />
        </div>
      </div>
    );
  }
}

export default App;
