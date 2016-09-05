
var uuid = require('uuid');
var Chats = require('./chat');
var Games = require('./games');

var Main = require('./main');
var io = Main.io;


var clients = {
    
};	


io.on('connection', function(client){
  Chats.fetchMessages()
    .then(function(msg){
      for(var i = msg.length -1; i >= 0; i--){
        client.emit('receive-message', msg[i]);
      }
    })
	console.log('we have a connection!');
	
  // wait for UUID to init client

	client.emit('uuid',uuid.v4());
  
  client.on('uuid', uuid=> {
  	//clients[uuid] = client;
  	console.log("uuid: ", uuid, ' added.');
  	
    // once UUID is received, start the actual init process
    Main.initialize(uuid,client);

  });
  
  client.on('new-message', function(msg){
    console.log('msg:', msg);
    var message = {
      content: msg.content,
      user_id: msg.user_id,
      game_id: msg.game_id
    }
    Chats.insert(message);
    // UUID of original sender of message to server needed on next line!

    client.emit('receive-message', msg);
    var oppClient = Main.getOppClientFromUuid(msg.uuid);
    if(oppClient && oppClient !==null)
      oppClient.emit('receive-message',msg);
  })

  client.on('new-game', function(msg){
    console.log('new game creation attempted', msg);
    var newGameObj = {
      game_id: msg.game_id,
      user1_id: msg.uuid,
      user2_id: 0,
      user1_orientation: 'white',
      user2_orientation: 'black',
      position: 'start',
      inProgress: true
    }
    Games.create(newGameObj).then(x=>{
      if(x[0]==1)
        Main.initialize(msg.uuid,client)
    });
  })

  client.on('join-game', function(newUserObj){
    console.log('join game attempted with game ID: ', newUserObj);  
    Games.checkForOpponent(newUserObj.game_id)
      .then(x=>{
        console.log("socketio_line69: ",x);
        if(x.length > 0){
          Games.addUser(newUserObj).then(x=>{
            console.log('added user',newUserObj);
            Main.initialize(newUserObj.uuid, client);
          });
        } else {
          io.emit('game-status', 'The chosen game is full.')
        }
      })
  })

  client.on('move', data=>{
    Games.getGameByUUID(data.uuid)
      .then(x=>{
        var moveData = {
          game_id: x[0].game_id,
          position: data.fenString 
        }
        return Games.update(moveData);
      })
    // Data: { uuid: uuid, moveObj: moveObj, pgnString: pgnString}
    Main.incomingMove(data,client);
    // console.log('Move received from client ', data.uuid);
    // client.broadcast.emit('move',data.moveObj);
    // console.log(data.pgnString);
  	
  });
  client.on('gameover', function(gameId){
    console.log('gameId in socketio_line101: ', gameId);
    Games.gameOver(gameId);
    // client.emit('Game-Over')
    
  })

  client.on('connect', data=>console.log(data));
});