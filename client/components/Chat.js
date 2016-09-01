import React from 'react';

export default class Chat extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      room: {},
      messages: [],
      socket: this.props.socket,
      user: this.props.username,
      game_id: undefined
    };
  }
  componentDidMount(){
    this.state.socket.on('receive-message', (msg)=>{ // es6 style, implicitly binds parameter "this"
      var messages = this.state.messages;
      messages.push(msg);
      this.setState({messages: messages})
      console.log("messages: ", this.state.messages);
    })
  }

  submitMessage(){
    var body = document.getElementById("message").value;
    document.getElementById("message").value = ""
    var message = {
      content: body,
      user_id: this.state.user || "anonymous",
      game_id: this.state.game || "lobby"
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
      <li><strong>{msg.user_id}</strong><span>: {msg.content}</span></li>
    )
    return (
      <div className='chat-container'>
        <div className='chat-box'>
          <ul>
            {messages}
          </ul>
        </div>
        <input id="message" type="text"/> <button className="sendButton" onClick={()=>this.submitMessage()}>Send</button><br/>
      </div>
    );
  }
}