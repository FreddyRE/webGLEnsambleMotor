var container;
var camera, controls, scene, renderer;
var objects = [];
var object1, object2
var interaction
var activeUsers = []

function setUsersOnline() {

    docRef.get().then((doc)=> {
        if(doc && doc.exists) {
            let slots = Object.keys(doc.data())
            
            for(let i=0; i<slots.length; i++){

                let obj = {}

                obj[slots[i]]["name"] = doc.data()[slots[i]]["name"]
                activeUsers.push(obj )
                
            }
        }
    }).catch((err)=>{
        console.log(err)
    })


}


function init() {


    setUsersOnline()

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
            //
            
function interactionDAE() {

    if(object1 === undefined || object2 === undefined){

        setTimeout(() => {
            interactionDAE()
        }, 200);
    } else {


        let keys = Object.keys(newInterface)
        let slotsWithPartMatch = {}
    
        for(let i in keys){
    
            let obj = { }
            slotsWithPartMatch[newInterface[keys[i]]["user"]] = keys[i]
        }
    
        switch (selectedSlot) {
    
            case "slot1" :
               
                let part =  newInterface[slotsWithPartMatch[selectedSlot]]
                let urlPath = eval(part["urlPathDAE"])
                let color = part["color"]
    
                urlPath.material.color = new THREE.Color(color)
                 
    
            break
    
            case "slot2" :
                console.log("segundo turno")
            break
    
            case  "slot3" :
                console.log("tercer turno")
            break;
    
            case "slot4" :
                console.log("cuarto turno")
            break
            case "" :
    
                console.log(object1)
            break
        }

    }


   
    /*

    var wasclicked = false

    if(object1=== undefined || object2 === undefined) {
        setTimeout(()=>{
            interactionDAE()
        }, 100)
    } else {

        interaction = new THREE.Interaction(renderer, scene, camera);


        for(let i in Object.keys(newInterface)){

            let keys = Object.keys(newInterface)[i]
            let path = eval(newInterface[keys]["urlPathDAE"])
            let color = newInterface[keys]["color"]
            let holder = eval(newInterface[keys]["urlPathHolder"])

            newInterface[keys]["isSelected"] = false
            
            path.on("mousedown", () => {

                if(newInterface[keys]["isSelected"] === false) {
                    newInterface[keys]["isSelected"] = true
                    path.material.color = new THREE.Color("rgb(255,255,255)")
                } else {
                    newInterface[keys]["isSelected"] = false
                    path.material.color = new THREE.Color(color)
                }
                
            })

            path.on("mouseover", () => {
                path.material.color = new THREE.Color("rgb(255,255,255)")
            })
            path.on("mouseout", () => {
                if(newInterface[keys]["isSelected"] === false) {
                    path.material.color = new THREE.Color(color)
                }
                
            })



        }

    }  
    */
}

function animate() {
    requestAnimationFrame( animate );
	render();
}

function render() {
	controls.update();
	renderer.render( scene, camera );
}



