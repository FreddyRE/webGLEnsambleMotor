const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path') 
const filesLoader = require("./public/filesLoader.js")
const dbConnection = require("./public/dbConnection.js")
const bodyParser = require('body-parser');
const services = require("./public/servicios.js")

server.listen(8080, function() {


	filesLoader.servingFiles(app, path)


	dbConnection.assignSeats()
	
	app.get('/', function(req, res){
		
		res.sendFile(path.join(__dirname+'/public/index.html'))
	})
	
	console.log('Servidor corriendo en http://localhost:8080');
});




