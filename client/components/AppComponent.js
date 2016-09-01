import React from 'react';
// Import React component from Chat
import Chat from './Chat';
import ChessboardComponent from './ChessboardComponent';
import NavComponent from './NavComponent';

var socket = require('socket.io-client')(document.location.href);

export default class AppComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: prompt('Please enter a username!')
    }
  }

  componentDidMount(){
    console.log('this.state.username is: ', this.state.username);
    socket.on('connect', function () {
      console.log('AppJS connected');
    });	
  }

  render(){
    return (
      <div id="container">
        <NavComponent />
        <ChessboardComponent socket={socket} />
        <Chat username={this.state.username} socket={socket}/ >
      </div>
    );
  }
}
