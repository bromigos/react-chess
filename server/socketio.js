
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
      for(var i = 0; i < msg.length; i++){
        io.emit('receive-message', msg[i]);
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
    Chats.insert(msg);
    io.emit('receive-message', msg);
  })

  client.on('new-game', function(msg){
    console.log('new game creation attempted', msg);
    var newGameObj = {
      user1_id: msg,
      user1_orientation: 'white',
      user2_orientation: 'black',
      position: 'start'
    }
    Games.create(newGameObj);
  })

  client.on('move', data=>{
  	// Data: { uuid: uuid, moveObj: moveObj, pgnString: pgnString}
	Main.incomingMove(data,client);
	// console.log('Move received from client ', data.uuid);
	// client.broadcast.emit('move',data.moveObj);
	// console.log(data.pgnString);
  	
  });
  	
  client.on('connect', data=>console.log(data));
});