import React from 'react';

export default class Chat extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      room: {},
      messages: [],
      socket: this.props.socket,
      user: this.props.username
    };
  }
  componentDidMount(){
    this.state.socket.on('receive-message', (msg)=>{ // es6 style, implicitly binds parameter "this"
      var messages = this.state.messages;
      messages.push(msg);
      this.setState({messages: messages})
      console.log(this.state.messages);
    })
  }

  submitMessage(){
    var body = document.getElementById("message").value;
    document.getElementById("message").value = ""
    var message = {
      body: body,
      user: this.state.user || "anonymous"
    }
    this.state.socket.emit('new-message', message);
  }
  // pickUser(){
  //   var user = document.getElementById("user").value;
  //   this.setState({user: user})
  // }

  // The following should grab the rooms and fetch the messages
  // for that room.
  // componentDidMount(){
  //   grabRooms()
  //     .then((roomData) => {
  //       this.setState({room: roomData}))
  //     });
    
  //   grabMessages()
  //     .then((messageData) =>{
  //       this.setState({messages: messageData})
  //     });
  // }


  render(){
    var messages = this.state.messages.map((msg)=>
      <li><strong>{msg.user}</strong><span>: {msg.body}</span></li>
    )
    return (
      <div className='chat-container'>
        <div className='chat-box'>
          <ul>
            {messages}
          </ul>
        </div>
        <input id="message" type="text"/> <button class="sendButton" onClick={()=>this.submitMessage()}>Send</button><br/>
      </div>
    );
  }
}