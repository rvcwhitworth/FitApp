


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

app.listen(port, () => console.log('Listening on port', port));





// new models.User({username: 'ethan', password: 'password', profile: 'testing'}).save().then((model) => {
    // 	console.log('saved: ', model);
// });

// database.ref('/test').push({test: 'heyhey'});
// console.log(firebaseDb.database().ref().child('test'))