const express = require('express');
const db = require('../database/schema.js');
const models = require('../database/models.js')
const admin = require('firebase-admin');
const graphqltools = require('graphql-tools');
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
const resolvers = require('../database/resolvers.js');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
app.use('/graphql', graphqlHTTP({
	schema: graphqltools.makeExecutableSchema({typeDefs: graphQLSchema, resolvers: resolvers}),
	graphiql: true,
	context: collections
}));

app.listen(port, () => console.log('Listening on port', port));
