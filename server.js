"use strict";

var express = require('express')
  , http = require("http")
  ;

var app    = express()
  , server = http.createServer(app)
  ;

var socketIO = require('socket.io')
, io = socketIO.listen(server)
;

var arDrone = require('ar-drone')
  , drone = arDrone.createClient()
  ;

var Leap = require('leapjs')
  , controller = new Leap.Controller()
  ; 

/* Drone navdata */

var droneFlying = 0;

drone.on('navdata', function(navdata) {

  if(navdata.droneState.lowBattery)
    emergencyLanding();

  droneFlying = navdata.droneState.flying;

});

/* Server init */

app.use(express.bodyParser());
app.use(express.static(__dirname+'/app'));

server.listen(8888);

require('ar-drone-png-stream')(drone, { port: 1337 });

io.sockets.on('connection', function (socket) {

  socket.on('emergency', disableEmergencyMode);

  socket.on('camera', switchCamera);

  socket.on('config', setConfig);

  socket.on('takeoff', function() {
    console.log("takeoff");
    // cleanTakeOff();
  });

  socket.on('land', function() {
    console.log("landing");
    // cleanLanding();
  });


});

/* Leap init */

controller.connect();

function onLeapFrame(Frame) {

  var hands = Frame.hands;

  if(hands.length > 0 && droneFlying) {

    goFrontBack(hands)

  } else {

    drone.stop();
  
  }
}

var thresold = {
 frontBack : {
   min : 15,
   max : 70
 }
}

/* Useful functions */

function disableEmergencyMode() {
  drone.disableEmergency();
}

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

function emergencyLanding() {
  console.log("emergencyLanding");
  drone.front(0);
  drone.back(0);
  drone.stop();
  drone.land();
}

function cleanTakeOff() {
  drone.takeoff();
  drone.stop();
}

function cleanLanding() {
  drone.stop();
  drone.land();
}

function goFrontBack(hands) {

  var hand = hands[0];

  var roll = hand.direction[1] * 100;

  if(insideThresold(roll, thresold.frontBack.min, thresold.frontBack.max)) {    
    var speed = rationalize(roll, thresold.frontBack.min, thresold.frontBack.max);
    // drone.front(-speed);
    console.log("BACK : " + speed);
  }

  if(roll < 0 && insideThresold(-roll, thresold.frontBack.min, thresold.frontBack.max)) {
    var speed = rationalize(-roll, thresold.frontBack.min, thresold.frontBack.max);
    // drone.front(speed);
    console.log("FRONT : " + speed);
  }

}

function rationalize(number, min, max) {
  return Math.round((number - min) * (100 / (max-min))) / 100;
}

function insideThresold(number, min, max) {
  if(number > min && number < max)
    return true;

  return false;
}