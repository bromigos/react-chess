var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chats = require('./chat');

var clients = {

};

var count = 0;

io.on('connection', function(client){
  console.log('we have a connection!');
  clients[client.id] = count++;
  console.log(clients);
  client.on('new-message', function(msg){
    console.log('msg:', msg);
    // Chats.insert(msg)
    io.emit('receive-message', msg);
  })
  client.on('move', data=>{
  	// Data: { moveObj: moveObj, pgnString: pgnString}
	console.log('Move received from client # ', clients[client.id]);
	client.broadcast.emit('move',data.moveObj);
	console.log(data.pgnString);
  });
  	
  client.on('connect', data=>console.log(data));
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
