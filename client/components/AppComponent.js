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

  componentWillMount(){
    socket.on('connect', function () {
      console.log('AppJS connected');
    }); 
     var myUUID;

    if(document.cookie && document.cookie.indexOf('uuid') > -1)
        myUUID = document.cookie.substring(document.cookie.indexOf('uuid')+5);
    // server sends UUID to every user, even ones that might have an existing cookie
    // if we have UUID from cookie, ignore uuid given.
    // Send back whatever UUID will be used by the client
    socket.on('uuid', uuid=> {
      if(myUUID===undefined){
          document.cookie = 'uuid=' + uuid + ';';
          myUUID = uuid;
          //console.log(document.cookie);
      }
      socket.emit('uuid',myUUID);
    });
  }

  componentDidMount(){
    console.log('this.state.username is: ', this.state.username);
    
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
