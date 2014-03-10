##  Hello Copter

```
var arDrone = require('ar-drone')
  , client = arDrone.createClient();

client.takeoff();

client
  	.after('2000', function() {
		client.clockwise(0.5);
  	}).after('5000', function() {
  		client.stop();
  		client.land();
  	});
```
