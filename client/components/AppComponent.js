import React from 'react';
// Import React component from Chat
import Chat from './Chat';
import ChessboardComponent from './ChessboardComponent';
import NavComponent from './NavComponent';
import BackgroundComponent from './BackgroundComponent';

var socket = require('socket.io-client')(document.location.href);

export default class AppComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: prompt('Please enter a username!')
    }
  }
  getInitialState(){
    this.state.loading = true;
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
    this.state.uuid = myUUID;
    socket.on('uuid', uuid=> {
      if(myUUID===undefined){
          document.cookie = 'uuid=' + uuid + ';';
          myUUID = uuid;
          //console.log(document.cookie);
        
      }
     this.setState({uuid: myUUID});
      socket.emit('uuid',myUUID);
    });
    socket.on('init', initObj=> { //initObj { gameId: 0, username: ...? }
      // game setup or chessboard?
      // make sure render() access state
      this.setState(Object.assign(initObj,{loading: false});
   });
  }

  componentDidMount(){
    console.log('this.state.username is: ', this.state.username);
    
  }
   



  waitUntilDoneLoading(){
      if(!this.state.loading){
        return (<NavComponent />
           <ChessboardComponent socket={socket} uuid={this.state.uuid} />
           <Chat username={this.state.username} socket={socket}/ >);
      }
      else {
        return ( <BackgroundComponent /> );
      }
    }

  render(){
    return (
      <div id="container">
        {waitUntilDoneLoading()}
        // <NavComponent />
        // <ChessboardComponent socket={socket} />
        // <Chat username={this.state.username} socket={socket}/ >
      </div>
    );
  }
}
