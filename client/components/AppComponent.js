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
      username: prompt('Please enter a username!'),
      loading: true
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
    socket.on('init', initObj=> { 

    //initObj { username: , 
      
      
        
      console.log(initObj);
      
     
      // make sure render() access state
      this.setState(Object.assign(initObj,{ everything: initObj, loading: false, pgn: initObj.position }));
   });
  }

  componentDidMount(){
    console.log('this.state.username is: ', this.state.username);
    
  }
  createGame(){
    socket.emit('new-game', this.state.uuid);
  }


  waitUntilDoneLoading(){
      
      
      if(!this.state.loading && this.state.showSetup){
        return (
          <div>
          <p>Show setup</p>
          {/* <GameSetupComponent uuid={this.state.uuid} /> */}
        </div>
        );
      }

      else if(!this.state.loading){
        return (
          <div>
         {/* <NavComponent /> */}
           <ChessboardComponent socket={socket} orientation={this.state.everything.orientation} uuid={this.state.uuid} pgn={this.state.pgn} everything={this.state.everything} />
           <Chat username={this.state.username} socket={socket}/ >
        </div>);
      }
      else {
        return ( <BackgroundComponent /> );
      }
    }

  render(){
    return (
      <div id="container">
        <button onClick={()=>this.createGame()}>Create Game</button><br/>
        {this.waitUntilDoneLoading()}
        {/* <NavComponent />
        // <ChessboardComponent socket={socket} pgn={this.state.pgn} />
        // <Chat username={this.state.username} socket={socket}/ > */}
      </div>
    );
  }
}
