var arDrone = require('ar-drone'),
	drone = arDrone.createClient(),
	png = drone.getPngStream();

	png.on('data', function(data) {
		console.log(data);
	});

	console.log("ok");