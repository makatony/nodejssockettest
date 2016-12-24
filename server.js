//inspired by shiffman

var port = 3000;

// var connect = require("connect");
// serveStatic = require("serve-static");
// var app = connect();
// app.use(serveStatic(__dirname));
// app.listen(port);

var express = require("express");
var app = express();
var server = app.listen(port);
app.use(express.static('public')); //makes the folder "public" be used in express
console.log("connected via port "+port);


var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection); //event listener for a connection

function newConnection (client) { //insert here all functions for a connection
	console.log("new client connected: " +client.id);
	var color;
	
	client.on("color", function (data) { 
		this.color = data.color; 
		console.log("color mapped: "+this.id +" "+this.color);
	});

	client.on('mouse', mouseMessage); //event listener for connection. listens for a message called "mouse"
	
	function mouseMessage(data) {
		Object.assign(data, { color: this.color });
		
		//gets the data from this connection and broadcasts to all OTHER connections. i.e. this users broadcasts to everyone except himself
		//if we wanted to broadcast to everyone incl himself, use global variable io.sockets.emit("mouse", data)
		this.broadcast.emit("mouse", data); //this client broadcasts
	}
}


