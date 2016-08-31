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



var count = 0;


Main.incomingMove = function(data){
	// 1. Validate move?
	// 2. Send move to DB
	// 2. Send move to opponent

	// Data: { uuid: uuid, moveObj: moveObj, pgnString: pgnString}
	// console.log('Move received from client ', data.uuid);
	// client.broadcast.emit('move',data.moveObj);
	// console.log(data.pgnString);
	console.log(data);
}


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
