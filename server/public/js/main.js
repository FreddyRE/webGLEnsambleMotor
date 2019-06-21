var container;
var camera, controls, scene, renderer;
var objects = [];
var object1, object2
var interaction
var activeUsers = []


function init() {

    container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = 1000;
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
	scene.add( new THREE.AmbientLight( 0xFFFFFF ) );
			
	var loadingManager = new THREE.LoadingManager( function () {
		scene.add( object1 );
	});
    
    var loadingManager2 = new THREE.LoadingManager( function () {
        scene.add( object2 );
    });

    var loader = new THREE.ColladaLoader( loadingManager );
	loader.load( 'models/motor.dae', function ( collada ) {
        object1 = collada.scene;
        /*
        objects.push(object1.children[0])
        objects.push(object1.children[1])
        objects.push(object1.children[2])
        objects.push(object1.children[3])
        */
        objects.push(object1)
                    
	});

    var loader2 = new THREE.ColladaLoader( loadingManager2 );
	loader2.load( 'models/motor_2.dae', function ( collada ) {
        object2 = collada.scene;
        objects.push(object2)
        changesDAE()
	});
        
    renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;
	container.appendChild( renderer.domElement );
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
    controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

    interactionDAE()
		
    
        
    var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
	dragControls.addEventListener( 'dragstart', function () {
        controls.enabled = false;
    });
    
    dragControls.addEventListener( 'dragend', function () {
	    controls.enabled = true;
	});

    
                    
    window.addEventListener( 'resize', onWindowResize, false );



}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
        
            
function animate() {
    requestAnimationFrame( animate );
	render();
}

function render() {
	controls.update();
	renderer.render( scene, camera );
}



