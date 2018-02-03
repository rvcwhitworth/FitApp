import { AsyncStorage } from 'react-native';
import { withApollo, graphql, ApolloProvider, compose } from 'react-apollo';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
const HOST_URI = 'http://ec2-18-219-7-36.us-east-2.compute.amazonaws.com:4000/graphql';

var user;
var dietPlans;
var exercisePlans;
var spotters;
var chatrooms;

/** GraphQL Client */
const client = new ApolloClient({
  link: new HttpLink({ uri: HOST_URI}),
  cache: new InMemoryCache()
});

/** Get user information, plans, spotters, and chatrooms */
AsyncStorage.getItem('@FitApp:UserInfo')
.then((userInfoString) => {
  user = JSON.parse(userInfoString);
  return user;
})
.then((user) => {
  client.query({ 
    query: exercisePlanQuery,
    variables: {
      id: user.id
    }
  })
  .then(({data}) => {
    exercisePlans = data.getExercisePlans
  })

  client.query({
    query: dietPlanQuery,
    variables: {
      id: user.id
    }
  })
  .then(({data}) => {
    dietPlans = data.getDietPlans;
  })
})
.catch((err) => console.error('Error retrieving data in store!', err));

/** Queries */
const exercisePlanQuery = gql`
query getExercisePlans($id: Int!){
  getExercisePlans(id: $id, type: "client") {
    regimen
  }
}`

const dietPlanQuery = gql`
query getDietPlans($id: Int!){
  getDietPlans(id: $id, type: "client") {
    diet
    trainer {
      fullName
    }
  }
}
`

export default {
  user,
  dietPlans,
  exercisePlans,
  spotters,
  chatrooms,
  client
}