
var uuid = require('uuid');

var Main = require('./main');
var io = Main.io;


var clients = {
    
};	


io.on('connection', function(client){
  	console.log('we have a connection!');
  	
    // wait for UUID to init client

  	client.emit('uuid',uuid.v4());
  
  client.on('uuid', uuid=> {
  	clients[uuid] = client;
  	console.log("uuid: ", uuid, ' added.');
  	
    // once UUID is received, start the actual init process
    //Main.initialize()

  });
  
  client.on('new-message', function(msg){
    Main.incomingChat(); // params?
  })
  client.on('move', data=>{
  	// Data: { uuid: uuid, moveObj: moveObj, pgnString: pgnString}
	Main.incomingMove(data);
	// console.log('Move received from client ', data.uuid);
	// client.broadcast.emit('move',data.moveObj);
	// console.log(data.pgnString);
  	
  });
  	
  client.on('connect', data=>console.log(data));
});