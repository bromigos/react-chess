import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import ChessboardComponent from './ChessboardComponent';
import NavComponent from './NavComponent';
import BackgroundComponent from './BackgroundComponent';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame';

var socket = require('socket.io-client')(document.location.href);
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar')

export default class AppComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: document.location.search.indexOf('name=') > -1 ? 
          document.location.search.substring(document.location.search.indexOf('name=')+5) :
          prompt("Please input a username..."),
      loading: true,
      yourGame: undefined
    }
  }
  

  componentWillMount(){
    socket.on('connect', function () {

      console.log('AppJS connected');
    }); 
    console.log('this.state.username is: ', this.state.username);
    
    socket.on('test_socket', data=> console.log("test socket data: ",data));

    socket.on('init', initObj=> { 
      /// having some sort of async issue with initObj being blank

      console.log('initObj: ',initObj);
     
      // make sure render() access state
      this.setState(Object.assign(initObj,{ loading: false, pgn: initObj.position, fen: initObj.position }));
   });  
    this.state.loading = true;
    var myUUID;

    if(document.cookie && document.cookie.indexOf('uuid') > -1){
      myUUID = document.cookie.substring(document.cookie.indexOf('uuid')+5);
    }
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
    
  }

  componentDidMount(){
    socket.on('game-status', error=> {
      alert(error);
    })
  }
  createGame(){
    var game_id = ("000000000" + Math.floor(Math.random()*1000000000)).slice(-9);
    var createObj = {
      game_id: game_id,
      uuid: this.state.uuid
    }
    socket.emit('new-game', createObj);
    this.state.yourGame = game_id;
    this.setState({gameCreated: false, showModal: false});
    console.log(this.state.yourGame);
  }

  getGameID(){
    return this.state.game_id;
  }

  joinGame(){
    //var gameId = document.getElementById("join-game").value;
    var gameId = ReactDOM.findDOMNode(this.refs.input).value;
    //alert(gameId);
    var userObj = {
      uuid: this.state.uuid,
      game_id: gameId
    }
    console.log('emitting join-game: ', userObj);
    socket.emit('join-game', userObj);
    this.setState({yourGame: gameId, showModal: false});
  }


  waitUntilDoneLoading(){
      if(!this.state.loading && this.state.showSetup){
        return (
          <div>
           <br />
           <ButtonToolbar>
            <CreateGame showModal={false} fn={this.createGame} socket={socket} orientation={this.state.orientation} uuid={this.state.uuid} position={this.state.position} yourGame={this.state.yourGame} />
            <JoinGame showModal={false} fn={this.joinGame} uuid={this.state.uuid} />
           </ButtonToolbar>
           <br />
          <p>Show setup</p>
          {/* <GameSetupComponent uuid={this.state.uuid} /> */}
        </div>
        );
      }

      else if(!this.state.loading){
        return (
          <div>
         {/* <NavComponent /> */}
            <div className="your-game"> Your game code is: { this.getGameID() }</div>
           <ChessboardComponent socket={socket} orientation={this.state.orientation} uuid={this.state.uuid} fen={this.state.position} />
        </div>);
      }
      else {
        return ( <BackgroundComponent /> );
      }
    }

  renderGameCode(){
    if(this.state.yourGame !== undefined){
      return <div className="your-game"> Your game code is: {this.state.yourGame}</div>
    } else {
      return (
        <div>
          <button onClick={()=>this.createGame()}>Create Game</button><br/>
          <input id="join-game" type="text" placeholder="enter game code here"/> <button className="joinButton"  onClick={()=>this.joinGame()}>Join Game</button><br/>
        </div>
      )
    }
  }

  render(){
    return (
      <div id="container">
        {this.waitUntilDoneLoading()}
        {/* <NavComponent />
        // <ChessboardComponent socket={socket} pgn={this.state.pgn} />*/}
        <Chat username={this.state.username} socket={socket} uuid={this.state.uuid} />
      </div>
    );
  }
}
