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
      game_id: this.state.game_id || "lobby",
      uuid: this.props.uuid
    }
    this.state.socket.emit('new-message', message);
    // if(this.state.game_id === "lobby"){
    //   this.state.socket.to('lobby').emit('new-message', message);
    // } else {
    //   this.state.socket.emit('new-message', message);
    // }
  }

  render(){
    var messages = this.state.messages.map((msg)=>
      <li><strong>{msg.user_id}</strong><span>: {msg.content}</span></li>
    )
    return (
      <div>
        <input id="message" type="text"/> <button className="sendButton"  onClick={()=>this.submitMessage()}>Send</button><br/>
        <div className='chat-container'>
          <ul>
            {messages}
          </ul>
        </div>
      </div>
    );
  }
}