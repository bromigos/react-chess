import React from 'react';
// Import React component from Chat
import Chat from './Chat';
import ChessboardComponent from './ChessboardComponent';

var socket = require('socket.io-client')('http://localhost:4000');


export default class AppComponent extends React.Component{


  constructor(props){
    super(props);

  }



  componentDidMount(){
    socket.on('connect', function () {
      console.log('AppJS connected');
    });	
  }

  render(){
    return (
      <div id="container">
        <ChessboardComponent socket={socket} />
        <Chat socket={socket}/ >
      </div>
    );
  }
}
