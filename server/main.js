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


Main.initialize = function(uuid,client){
	// 0. Wait for uuid to come back before firing this method
	// 1. check for active game in DB
	
	if(Games.getGameByUUID(uuid)){ //check if they in-game
		// 1. emit init obj



		var initObj = Object.assign(Games.getGameByUUID(),{uuid: uuid});

		//TO DO:
		// ==> {username}

		initObj.username = 'Jacoby';

		
		var orientation = ['white','black'];
		if(initObj.user1_id == uuid){
			initObj.orientation = initObj.user1_orientation;
		}
		else
			initObj.orientation = initObj.user2_orientation;


		client.emit('init',initObj);
	}
	else {
		// 1. Send init obj with blank game
		console.log('getGameByUUID failed...');
		
			
	}


	// 		Active? Join game
	//		Not? 	show game setup

	// join game => pull down chats/board, check orientation / notify user? 
};


Main.incomingMove = function(data,client){
	// 1. Validate move?
	// 2. Send move to DB
	// 2. Send move to opponent based on client hashmap

	// Data: { uuid: uuid, moveObj: moveObj, pgnString: pgnString}
	
	console.log('Move received from client ', data.uuid);
	 client.broadcast.emit('move',data.moveObj);
	// console.log(data.pgnString);
	console.log(data);
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

//endpoint for testing only

app.get('/game_1785', function(req,res) {

});


app.get('/game_*', function(req,res) { // responds to /game_:gameid
	var gameId = req.url.substring(req.url.lastIndexOf('/game_')+6);
	console.log(gameId);
	res.end(gameId);
});








var port = process.env.PORT || 4000;
server.listen(port);
console.log("Listening on localhost:" + port);
