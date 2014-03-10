## La base obligatoire

```
var arDrone = require('ar-drone')
  , drone = arDrone.createClient();

var Leap = require('leapjs')
  , controller = new Leap.Controller(); 

controller.on('connect', function() {
  Leap.loop(onLeapFrame);
});

controller.connect();

function onLeapFrame(Frame) {
	// Détection des mouvements 
	// Et on applique les actions que l'on souhaite ici
}

```