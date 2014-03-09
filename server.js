"use strict";  

/******************************/
/*          Server            */
/******************************/

var express = require('express')
  , http = require("http")
  ;

var app    = express()
  , server = http.createServer(app)
  ;

app.use(express.bodyParser());
app.use(express.static(__dirname+'/app'));

server.listen(8888);

/******************************/
/*          ArDrone           */
/******************************/

var arDrone = require('ar-drone')
  , drone = arDrone.createClient()
  ;

require('ar-drone-png-stream')(drone, { port: 1337 });

function disableEmercyMode() {
  drone.disableEmergency();
  console.log("Disabling emergency mode... wait a few moment pls.");
}

function switchCamera(pChannel) {
  var channel = parseInt(pChannel, 10);
  drone.config('video:video_channel', channel);
  console.log("Switch to " + (channel==0 ? "head" : "bottom") + " camera");
}

function setConfig(msg) {

  var config = JSON.parse(msg);
  drone.config(config.name, config.val);

  console.log("Change " + config.name + " value to " + config.val);
}

/******************************/
/*          LeapMotion        */
/******************************/

var Leap = require('leapjs');

var controller = new Leap.Controller();

controller.on('connect', onControllerConnect);
controller.on('deviceDisconnect', onControllerDisconnect);

controller.connect();

function onControllerConnect() {
	Leap.loop(onLeapFrame);
	console.log("Leap Motion connecté");
}

function onControllerDisconnect() {
	Leap.loop(function(){});
	console.log("Leap Motion Déconnecté");
}

function onLeapFrame(Frame) {
	// Action to do here
}

/******************************/
/*    Communication Socket    */
/******************************/

var socketIO = require('socket.io')
  , io = socketIO.listen(server)
  ;

io.sockets.on('connection', function (socket) {

  socket.on('emergency', disableEmercyMode);

  socket.on('camera', switchCamera);

  socket.on('config', setConfig);

});
