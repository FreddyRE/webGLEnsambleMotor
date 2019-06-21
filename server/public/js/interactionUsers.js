var wasSelectedPart = false
var wasSelectedTarget = false
let partSelected = ""
let ghostSelected = ""
 
function addMaterialColor(arr, color) {

    if(arr.length === undefined) {

        arr.color = new THREE.Color(color)
    } else {
    
        for(let i in arr){
            arr[i].color = new THREE.Color(color)
        }

    }

}

function changeOpacity(arr, val) {

    if(arr.length === undefined) {
        arr.opacity = val
    } else {
        for(let i in arr){
            arr[i].opacity = val
        }
    }
   
}

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
                
                addInteraction(part)
                //urlPath.material.color = new THREE.Color(color)

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
}


function addInteraction(part) {

    interaction = new THREE.Interaction(renderer, scene, camera);

    addInteractionToGhost()

    for(let i in object1.children) {
        object1.children[i].on("mouseover", ()=> {
            if(!wasSelectedPart) {
                addMaterialColor(object1.children[i].material, "rgb(255,0,0)")
            }  
        })
        object1.children[i].on("mouseout", ()=> {

            if(!wasSelectedPart){
                addMaterialColor(object1.children[i].material, "rgb(255,255,255)")
            }
            
        })
        object1.children[i].on("mousedown", ()=> {
            if(wasSelectedPart){
                wasSelectedPart = false
            } else {
                wasSelectedPart = true
                checkEnsambleCorrecto(`positive:${object1.children[i].name}`, object1.children[i])
            }
        })
    }
    

}


function addInteractionToGhost() {

    for(let i in object2.children){

        object2.children[i].on("mouseover", ()=>{

            if(!wasSelectedTarget) {
                changeOpacity(object2.children[i].material, 1)
                addMaterialColor(object2.children[i].material, "rgb(255,0,0)")
            } 
             
        })

        object2.children[i].on("mouseout", ()=>{

            if(!wasSelectedTarget) {
                changeOpacity(object2.children[i].material, 0.05)
                addMaterialColor(object2.children[i].material, "rgb(255,255,255)")

            }
        })   
    
        object2.children[i].on("mousedown", ()=>{
            if(wasSelectedTarget) {
                wasSelectedTarget = false
            } else {
                wasSelectedTarget = true
                checkEnsambleCorrecto(`ghost:${object2.children[i].name}`,object2.children[i] )
            }
           
        })

    }
}


function checkEnsambleCorrecto(partName, obj) {
    
  
    switch (partName.split(":")[0]) {
        case "ghost":
            ghostSelected = partName.split(":")[1]
        break
        case "positive":
            partSelected = partName.split(":")[1]
        break;
    }

    switch(selectedSlot){
        case "slot1" :

            if(wasSelectedPart && wasSelectedTarget) {
               if(partSelected === ghostSelected) {
                   ensambleMotor(obj)
               } else {
                   console.log("reset")
               }
            }
            
        break;
    }
}


function ensambleMotor(obj) {

    let obj1 = {}

    for(let i in Object.keys(newInterface)){
        let daeName = newInterface[Object.keys(newInterface)[i]]["DAEName"]
        if(daeName === obj.name){
            obj1[daeName] = newInterface[Object.keys(newInterface)[i]]
        }

    }

    console.log(obj1)


    switch (obj.name) {
        case "cabeza_motor" :
            let objMaster = eval(obj1[obj.name]["urlPathDAE"])
            let objGhost = eval(obj1[obj.name]["urlPathHolder"])

            var tl = new TimelineMax({delay:0.5});
            tl.to(objGhost, 0.5, {visible:false})
            tl.to(objMaster.position, 0.5, {z:10, y:0, z: 17.5})
            tl.to(objMaster.scale, 1, {x: 0.6825, y:0.6825, z: 0.6825} )
        break
    }

    

}