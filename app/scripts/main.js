(function() {

	// On se connecte au socket du serveur
	var socket = io.connect('http://localhost:8888');

	var btnDisableEmergency = document.getElementById("disable-emergency");

	btnDisableEmergency.addEventListener('click', function(evt) {
		
		socket.emit('emergency', 'disable');

	}, false);

	setCameraChannelListener();

	function setCameraChannelListener() {

		var btnList = document.querySelectorAll(".video-channel button")

		for(var i=0, btnCamera; btnCamera = btnList[i]; i++) {

			btnCamera.addEventListener('click', function(evt) {
				var prevBtn = document.querySelector(".video-channel .btn-active");
				prevBtn.className="";
				this.className="btn-active";

				socket.emit('camera', this.getAttribute('data-channel'));

			}, false);

		}

	}

	document.getElementById("takeoff").addEventListener('click', function(evt) {
		socket.emit('takeoff', 'takeoff');
	}, false);

	document.getElementById("land").addEventListener('click', function(evt) {
		socket.emit('land', 'land');
	}, false);

})();