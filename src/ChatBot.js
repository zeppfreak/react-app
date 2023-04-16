import React from 'react';
import axios from 'axios';
import './ChatBot.css'


class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { user: "bot", text: "Hello! How can I assist you today?" }
      ],
      currentInput: "",
    };
  }

  handleChange(event) {
    this.setState({ currentInput: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.state.currentInput) {
      return;
    }
    let message = {
      "user": "user",
      "text": this.state.currentInput
    };
    this.setState({
      messages: [...this.state.messages, message],
      currentInput: ""
    });

    let response;
    try {
      response = await axios.post("http://localhost:5000/api/v1/chatbot", {
        message: message
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    message = {
      "user": "bot",
      "text": response.data.message
    };
    this.setState({
      messages: [...this.state.messages, message]
    });
  }

  render() {
    const messageItems = this.state.messages.map((message, index) => (
    //   <div key={index}>
    //     {message.user}: {message.text}
    //   </div>
      <div className={`chat-message ${message.user === "user" ? "user-message" : "chatbot-message"}`} key={index}>
        {message.text}
      </div>
    ));

    return (
      <div className="chat-container">
        <h1>ChatBot</h1>
        <div className="chat-messages">{messageItems}</div>
        <form className="chat-form" onSubmit={(event) => this.handleSubmit(event)}>
          <input className="chat-input" type="text" onChange={(event) => this.handleChange(event)} value={this.state.currentInput} />
          {/* <input type="submit" value="Submit" /> */}
          <button className="chat-submit" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ChatBot;
