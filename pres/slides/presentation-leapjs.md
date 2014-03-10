##  Presentation-LeapJS

Un module NodeJS ou un librairie cliente

```
var controller = new Leap.Controller();

controller.on('frame', function(currentFrame) {
	var hands = currentFrame.hands.length;
	console.log("Il y a " + hands + " au dessus du Leap Motion" );
});

controller.connect();

```