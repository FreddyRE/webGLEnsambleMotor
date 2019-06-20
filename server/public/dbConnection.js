var firebase = require("firebase") 


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
  var availableSlot

  exports.assignSeats = function() {

    const dbRef = firebase.database().ref().child('users')
    dbRef.on('value', snap => {

      let keys = Object.keys(snap.val())
      for(let i= 0; i<= keys.length-1; i++){
          if(snap.val()[keys[i]]["name"] === ""){
            console.log(keys[i])
            break;
          } else {
            console.log("no rooms available")
          }
      }
      
    })
  }

/*

  exports.updateUser = functions.firestore.document('usuarios/slot1').onUpdate((change, context) => {
  
    const newValue = change.after.data();

    const previousValue = change.before.data();

    console.log(newValue, previousValue)

    // perform desired operations ...
  });


  module.exports  = {

    getUserData : function() {

      functions.https.onRequest((req, res)=>{
        admin.firestore().doc('usuarios/slot1').get().then(snapshot => {

          const data = snapshot.data()
          console.log(data)
          res.send(data)
        })
        .catch(error => {

          console.log(error)
          res.status(500).send(error)
        })
      })
    }


  }
  */
/*
module.exports = {

	assignSeats : function() {


    
    return new Promise((res, rej)=>{

        
        exports.updateUser = functions.firestore
        .document(docRef)
        .onUpdate((change, context) => {
          res(change)

        });

    
        
        for(let i= 1; i<=numberOfSlots; i++){

          let ref = `usuarios/slot${i}`
          docRef = firestore.doc(ref)
        
          docRef.get().then((doc)=> {
    
              if(doc && doc.exists) {  

                  if(doc.data()["name"] === "") {
                      availableSlot = true
                      availableSlots.push(`slot${i}`)
                  } else if(i === numberOfSlots){
                      availableSlot = false
                  }
              }
          }).catch((err)=>{
              console.log(err)
          })
      }

      verifyAvailableRoom()

        
      function verifyAvailableRoom() {

          if(availableSlot != undefined) {
              if(availableSlot === true){
                  selectedSlot = `${availableSlots[0]}`
                  res(selectedSlot)
              } else {
                  res("guest")
              }
          } else {
              setTimeout(() => {
                  verifyAvailableRoom()
              }, 100);
          }
      }
      

    })

  }

}


*/