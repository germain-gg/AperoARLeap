## Informations de navigation

```
	var state = {};

	drone.on('navdata', function(navdata)) {

		if( navdata.droneState.lowBattery ) {
			drone.stop();
			drone.land();
		}

		state.flying = navdata.droneState.flying;

		// Et plus encore

	});

```