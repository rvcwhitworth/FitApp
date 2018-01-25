const express = require('express');
const db = require('../database/schema.js');
const models = require('../database/models.js')
var admin = require('firebase-admin');

const app = express();
const port = 4000;
var TOKEN = require('./../TOKENS.js');


admin.initializeApp({
  credential: admin.credential.cert(TOKEN.firebaseConfig.serviceAccount),
  databaseURL: TOKEN.firebaseConfig.databaseURL
});

app.get('/', function (req,res) {
    res.send('Hello');
 });
// new models.User({username: 'ethan', password: 'password', profile: 'testing'}).save().then((model) => {
// 	console.log('saved: ', model);
// });



app.listen(port, () => console.log('Listening on port', port));
