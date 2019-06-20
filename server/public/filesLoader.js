

module.exports = {

	servingFiles : function(app, path) {

		app.get('/js/threeJS/three.min.js', function(req, res) {
    		res.sendFile(path.join(__dirname + '/js/threejs/three.min.js'));
		});

	app.get('/js/threeJS/interaction.min.js', function(req, res) {
    	res.sendFile(path.join(__dirname + '/js/threejs/interaction.min.js'));
	});

	app.get('/js/threeJS/DragControls.js', function(req, res) {
    	res.sendFile(path.join(__dirname + '/js/threejs/DragControls.js'));
	});

	app.get('/js/threeJS/TrackballControls.js', function(req, res) {
    	res.sendFile(path.join(__dirname + '/js/threejs/TrackballControls.js'));
	});

	app.get('/js/threeJS/ColladaLoader.js', function(req, res) {
    	res.sendFile(path.join(__dirname + '/js/threejs/ColladaLoader.js'));
	});


	app.get('/js/main.js', function(req, res) {
    	res.sendFile(path.join(__dirname + '/js/main.js'));
	});

	app.get('/js/sessionController.js', function(req, res) {
    	res.sendFile(path.join(__dirname + '/js/sessionController.js'));
	});

	app.get('/js/interface.js', function(req, res) {
    	res.sendFile(path.join(__dirname + '/js/interface.js'));
	});
	app.get('/js/cambiosDAE.js', function(req, res) {
    	res.sendFile(path.join(__dirname + '/js/cambiosDAE.js'));
	});

	app.get('/css/main.css', function(req, res) {
    	res.sendFile(path.join(__dirname + '/css/main.css'));
	});

	app.get('/models/motor.dae', function(req, res) {
    	res.sendFile(path.join(__dirname + '/models/motor.dae'));
	});

	app.get('/models/motor_2.dae', function(req, res) {
    	res.sendFile(path.join(__dirname + '/models/motor_2.dae'));
	});

	}
}
