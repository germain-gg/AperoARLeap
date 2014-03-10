## Décollage & Atterissage

```
	function onLeapFrame(Frame) {
		
		var gestures = Frame.gestures;

		if(gestures.length > 0) {

			for(var i=0, gesture; gesture = gestures[i]; i++) {

				if(gesture.type == 'keyTap')
					state.flying ? drone.land() : drone.takeoff();

			}

		}

	}

```
