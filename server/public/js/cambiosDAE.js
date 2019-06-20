function changesDAE() {

    camera.rotation.set(-0.1800930214745674, -0.829615058577863, -0.0497798945948699)
    camera.updateProjectionMatrix()

    object1.scale.set(40,40,40)
    object1.position.set(-400,0,-70)
    object1.rotation.set(0,1.5,0)

    object2.scale.set(70,70,70)
    object2.position.set(300,0,0)
    object2.rotation.set(0,1.5,0)

    for(let i= 0; i<10; i++){
        object1.children[2].material[i] = new THREE.MeshPhongMaterial()

        
    }

    for(let i= 0; i<10; i++) {

        object2.children[2].material[i] = new THREE.MeshPhongMaterial()

    }

    transparencyToGoalObj()


  

    initialSetupPiezas()
    explotarPiezas()
   
            
    //object1.children[0].position.set(0,0,0)
}

function initialSetupPiezas(){

    for(let i in Object.keys(newInterface)){
        let keys = Object.keys(newInterface)[i]
        let path = eval(newInterface[keys]["urlPathDAE"])
        
        path.material.color = new THREE.Color("rgb(104, 104, 104)")

    }
}


function explotarPiezas() {
    for(let i in Object.keys(newInterface)){
        let keys = Object.keys(newInterface)[i]
        let path = eval(newInterface[keys]["urlPathDAE"])
        let pos = newInterface[keys]["position"]

        path.position.set(pos[0], pos[1], pos[2])

        //path.rotation.set( Math.random() * (2) -1,  Math.random() * (2) -1,  Math.random() * (2) -1)

    }

}


function transparencyToGoalObj() {

    for(let i=0; i<10; i++){
        object2.children[0].material[i] = new THREE.MeshPhongMaterial()
        object2.children[0].material[i].transparent = true
        object2.children[0].material[i].opacity = 0.05
        object2.children[1].material[i] = new THREE.MeshPhongMaterial()
        object2.children[1].material[i].transparent = true
        object2.children[1].material[i].opacity = 0.05
        object2.children[2].material[i] = new THREE.MeshPhongMaterial()
        object2.children[2].material[i].transparent = true
        object2.children[2].material[i].opacity = 0.05
        object2.children[3].material[i] = new THREE.MeshPhongMaterial()
        object2.children[3].material[i].transparent = true
        object2.children[3].material[i].opacity = 0.05
        object2.children[5].material[i] = new THREE.MeshPhongMaterial()
        object2.children[5].material[i].transparent = true
        object2.children[5].material[i].opacity = 0.05
    }
    
    object2.children[4].material[0] = new THREE.MeshPhongMaterial()
    object2.children[4].material[0].transparent = true
    object2.children[4].material[0].opacity = 0.05
    object2.children[4].material = new THREE.MeshPhongMaterial()
    object2.children[4].material.transparent = true
    object2.children[4].material.opacity = 0.05
}