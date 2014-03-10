## Et ensuite

Reste à trouver les interactions à utiliser pour faire voler le drone... 

```
	function onLeapFrame(Frame) {
		var hands = Frame.hands
		if(hands.length > 0) {
      		goFrontBack(hands);
    	}
	}

	function goFrontBack(hands) {
		var roll = hands[0].direction[1];
		roll = rationalize(roll);

		roll > 0 ? drone.front(roll) : drone.back(-roll);	

	}
```