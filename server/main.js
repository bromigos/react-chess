var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chats = require('./chat');
var uuid = require('uuid');
var cookieParser = require('cookie-parser')
var Main = module.exports;
Main.io = io;
var socketio = require('./socketio');

var Games = require('./Games');

var count = 0;

var uuidToClient = {};
var oppUuidToClient = {};

Main.getOppClientFromUuid = function(uuid){
	var newClient = oppUuidToClient[uuid];
	return newClient == undefined ? null : newClient;
}

Main.initialize = function(uuid,client){
	// 0. Wait for uuid to come back before firing this method
	// 1. check for active game in DB
	uuidToClient[uuid] = client;
	
	// safely ignore -- just for testing.
	// for(var key in uuidToClient){
	// 	uuidToClient[key].emit('test_socket',{count: count++, uuids: Object.keys(uuidToClient)});
	// }
	// ok to delete / ignore this
	Games.getGameByUUID(uuid).then(gameRow => {
		console.log("gameRow",gameRow);
		if(gameRow.length>0){ //check if they in-game
			// 1. emit init obj
			//if(false){
			var initObj = Object.assign(gameRow[0],{uuid: uuid});
			//TO DO:
			// ==> {username}

			//initObj.username = 'Jacoby';
			var oppUUID = initObj.user1_id == uuid ? initObj.user2_id : initObj.user1_id;

			if(initObj.user1_id == uuid){
				initObj.orientation = initObj.user1_orientation;
				oppUuidToClient[initObj.user2_id] = client;
				oppUuidToClient[uuid] = uuidToClient[initObj.user2_id];
			}
			else{
				initObj.orientation = initObj.user2_orientation;
				oppUuidToClient[initObj.user1_id] = client;
				oppUuidToClient[uuid] = uuidToClient[initObj.user1_id];
			}

			//console.log(uuidToClient[uuid]===client);
			//console.log(oppUuidToClient[oppUUID]);
			
			
			// we need to send a real blank init object so we don't have the problems
			// that we are now having. 
			console.log('initObj',initObj);
			client.emit('init', Object.assign(initObj,{showSetup:false, game_id: gameRow[0].game_id}));
		}	else {
			// 1. Send init obj with blank game
			console.log('getGameByUUID failed...');
			client.emit('init', {showSetup: true, uuid: uuid});
		}
	}); // end of .then()
	// 		Active? Join game
	//		Not? 	show game setup
	// join game => pull down chats/board, check orientation / notify user? 
};


Main.incomingMove = function(data,client){
	// 1. Validate move?
	// 2. Send move to DB
	// 3. Send move to opponent based on client hashmap
	// Data: { uuid: uuid, moveObj: moveObj, pgnString: pgnString}	
	console.log('Move received from client ', data.uuid);
	
	this.getOppClientFromUuid(data.uuid).emit('move',data.moveObj);
	// client.broadcast.emit('move',data.moveObj);
	// console.log(data.pgnString);
	console.log('data: ', data);

	// chess.load takes --> data.fenString
	// chess.load(data.fenString);
	// console.log(chess.game_over());
	
	// if (chess.game_over()) {
	// 		means there is a stalemate or checkmate
	// 		emit message to AppComponent
	// 		AppComponent displays a modal with 2 options: rematch/exit
	// } else {
	// 		do nothing;
	// }


};

Main.incomingChat = function(data){
	// 1. Emit to correct client -- need UUID of message sender to use client hashmap
	// 2. append to db
	console.log('msg:', msg);
  // Chats.insert(msg)
  io.emit('receive-message', msg);
};

app.get('/', function(req,res) {
	res.sendFile(path.resolve('./client/public/index.html'));
});

app.use(express.static(path.join(__dirname, "../client/public")));

app.use(bodyParser.json());

app.get('/app-bundle.js',
  browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

var port = process.env.PORT || 4000;
server.listen(port);
console.log("Listening on localhost:" + port);
