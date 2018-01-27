const express = require('express');
const db = require('../database/schema.js');
const models = require('../database/models.js')
const admin = require('firebase-admin');
// const firebase = require('firebase');
const app = express();
const port = 4000;
const TOKEN = require('./../TOKENS.js');
var serviceAccount = require("./../serviceAccount.json");

var firebaseDb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: TOKEN.firebaseConfig.databaseURL
});

var database = firebaseDb.database();
const body_parser = require('body-parser');
const collections = require('../database/collections.js'); // db functions live in here
const graphQLSchema = require('../database/graphQLSchema.js');

app.post('/message', (req, res)=>{
    function pushMessge(roomId, message){ //ADD THIS MESSAGE TO THIS ROOM CHANGE VARS ROOMID & MESSAGES
        database.ref('/rooms/' + roomId + '/messages').push(message)
    }
})

function roomsListenerSetup(roomsArray){ //ADDS EVENTLISTENER FOR NEW MESSAGES TO THESE ROOMS
    roomsArray.map((roomId)=>{
        database.ref('/rooms/' + "testRoom2" + '/messages').on("child_added", function(snapshot){
            console.log(snapshot.val());
        }, 
        function(errorObject){
            console.log("the read failed: " + errorObject.code);
        })
    })
}

app.listen(port, () => console.log('Listening on port', port));