import React from 'react';

// import { fetchShops } from '../models/shop'


export default class Chat extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      room: {},
      messages: []
    };
  }

  // The following should grab the rooms and fetch the messages
  // for that room.
  // componentDidMount(){
  //   grabRooms()
  //     .then((roomData) => {
  //       this.setState({shop: shopData}))
  //     });
    
  //   grabMessages()
  //     .then((messageData) =>{
  //       this.setState({messages: messageData})
  //     });
  // }


  render(){
    return (
      <div className='chat-box'>
        <div>{this.state.messages}</div>
        <form onSubmit={this.submit}>
          <input onChange={this.updateInput} value={this.state.text} type="text" placeholder="Your message" />
          <input type="submit" value="Send" />
        </form>
    </div>
    );
  }
}