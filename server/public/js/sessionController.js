var firebase

var firebaseConfig = {
    apiKey: "AIzaSyDf2Wwh6DH1dVmfsISWY4b1En5hJu7D_u8",
    authDomain: "presentacionwebgl2.firebaseapp.com",
    databaseURL: "https://presentacionwebgl2.firebaseio.com",
    projectId: "presentacionwebgl2",
    storageBucket: "presentacionwebgl2.appspot.com",
    messagingSenderId: "568020053752",
    appId: "1:568020053752:web:1ebbdc55d22e8a6b"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore()
var docRef = firestore.doc("usuarios/slot1")
var availableSlots = []
var selectedSlot = ""
var numberOfSlots = 5
var isAvailable  = false
var allAreConnected = false

document.querySelector("#user-input").style.display = "block"
  
  
function sendName() {

    let input = document.querySelector("#user-input > input").value

    if(input.toUpperCase().search(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)!= -1){
        
        document.querySelector("#user-input").style.display = "none"
        setTimeout(()=>{

            document.querySelector("#pass-input").style.display = "block"
            document.querySelector("#label-guest").style.display = "block"
            
            document.querySelector("#iconSend2").addEventListener("click", ()=>{sendPassAndCheckSeat(input)})

        },500)
      
    } else {
        alert("Favor insertar un nombre Valido")
    }
}
  

function sendPassAndCheckSeat(data) {

    let inputpass = document.querySelector("#pass-input > input").value

    for(let i= 0; i<=numberOfSlots; i++){

        let ref = `usuarios/slot${i}`
        docRef = firestore.doc(ref)
        
        docRef.get().then((doc)=> {
    
            if(doc && doc.exists) {  
                if(doc.data()["pass"]===inputpass && doc.data()["name"] === "") {
                    isAvailable = true
                    if(inputpass === "0") {
                        goToPlaygroundAsGuest()
                    } else {
                        docRef = firestore.doc(ref)
                        docRef.update({
                            "name" : data
                        }).then(()=>{
                            goToWaitingAllPlayers(data, inputpass, ref)
                        }).catch((err)=> {
                            console.log(err)
                        })
                    }
                    
                } else if(doc.data()["pass"]===inputpass && doc.data()["name"] !== "") {
                    isAvailable = true
                    alert("password ya fue usado")
                }
                else if(i === numberOfSlots-1 && isAvailable === false) {
                    alert("password incorrecto")
                }
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    
}

function goToWaitingAllPlayers(user,pass,ref) {

    insertInRealTimeDBUser(user, pass, ref)

    document.getElementById("waiting-all-users").style.display = "block"
    document.querySelector("#pass-input").style.display = "none"
    document.querySelector("#label-guest").style.display = "none"

    firebase.database().ref().child('users').on('value', snap => {

        let snapIni = Object.keys(snap.val())
        let notConnectedUsers = []
        for(let i in snapIni) {

            if(snapIni[i] != "slot0"){
                if(snap.val()[snapIni[i]]["name"] === "") {
                    allAreConnected = false
                    notConnectedUsers.push(snapIni[i])
                } 
            }
        }
        console.log(notConnectedUsers)
        if(notConnectedUsers.length === 0) {

            document.getElementById("waiting-all-users").style.display = "none"
            alert("todos estan conectados")
            goToPlayground()
        }

    })
   


}

function insertInRealTimeDBUser(user, pass, ref) {

    let slot = ref.split("/")[1]

    selectedSlot = slot
    let obj = {}
    let objTemp = {}

    objTemp["name"] = user
    objTemp["pass"] = pass

    obj[slot] = objTemp
    
    firebase.database().ref().child('users').update(
        obj
    )
    
}


function assignNameToSlot(name, key, pass) {

    firebase.database().ref().child('users').update(obj);


    if(pass != "0") {

        let obj = {}
        let objTemp = {}

        objTemp["name"] = name
        objTemp["pass"] = pass

        obj[key] = objTemp

        firebase.database().ref().child('users').update(obj);

    
    } else {

        document.querySelector("#pass-input").style.display = "none"

        console.log("entrando como guest")
    }
    
    
}


function goToPlayground() {

    init()
    animate()
}

 

function goToPlaygroundAsGuest() {


    console.log("guest session")
    //init()
    //animate()
}

