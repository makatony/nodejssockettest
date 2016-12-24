var socket;
var strokeColor;

function setup() {
	createCanvas(600, 400);
	background(51);
	strokeColor = [random(255), random(255), random(255)];
	
	//connects to the server
	socket = io.connect('http://localhost:3000'); //io variable comes from importing socket.io

	//event listener to receive from server
	socket.on("mouse", newDrawing);
	socket.emit("color", { color: strokeColor });
}

function newDrawing(data) {
	// console.log ("receiving: "+data.x +","+data.y + ","+data.color);
	noStroke();
	fill(data.color);
	ellipse(data.x, data.y, 36, 36);
}

function mouseDragged() { //seems to be a function from P5
	// console.log("sending: "+mouseX + "," +mouseY);
	
	var dataMessage = {
		x: mouseX,
		y: mouseY
	}
	socket.emit('mouse', dataMessage); //mouse is the name of the message
	
	noStroke();
	fill(strokeColor);
	ellipse(mouseX, mouseY, 36, 36);
}

function draw() {

}