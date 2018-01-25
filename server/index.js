const express = require('express');
const db = require('../database/schema.js');
const models = require('../database/models.js')

const app = express();
const port = 4000;

// new models.User({username: 'ethan', password: 'password', profile: 'testing'}).save().then((model) => {
// 	console.log('saved: ', model);
// });

app.listen(port, () => console.log('Listening on port', port));
