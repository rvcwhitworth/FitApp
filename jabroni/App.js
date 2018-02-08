import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import LandingScreen from './LandingPage';
import ClientLogInScreen from './client/ClientLogIn.js';
import TrainerLogInScreen from './trainer/TrainerLogIn.js'
import SignUpScreen from './SignUp';
import Plan from './client/PlanScreen';
import Camera from './utilities/camera.js';
import TeamScreen from './client/TeamScreen';
import DataScreen from './client/DataScreen';
import Chat from './utilities/Chat'
import Home from './Navigator.js'

const TrainerHome = Home('test')
const ClientHome = Home('client')

const HOST_URI = 'http://ec2-18-219-7-36.us-east-2.compute.amazonaws.com:4000/graphql';

const AuthUser = () => {
  AsyncStorage.getItem('Test:key', (err, val) => {
      if (err) console.log(err);
      else console.log(val, JSON.parse(val))
  })
}

const App = StackNavigator({
  landing: {
    screen: LandingScreen,
  },

  signUp: {
    screen: SignUpScreen,
  },

  ClientLogIn: {
    screen: ClientLogInScreen
  },

  clientHome: {
    screen: ClientHome
  },

  TrainerLogIn: {
    screen: TrainerLogInScreen
  },

  TrainerHome: {
    screen: TrainerHome
  },

  Messages:{
    screen: Chat
  },
  Camera:{
    screen: Camera
  }
},  
{
  headerMode: 'none'
});

App.router = Home.router;

class AppView extends React.Component {
  constructor (props) {
    super(props)

    /** GraphQL Client */
    this.client = new ApolloClient({
      link: new HttpLink({ uri: HOST_URI}),
      cache: new InMemoryCache()
    });
  } 

  componentWillMount () {
    StatusBar.setHidden(true);
  }

  render () {
    return (
      <ApolloProvider client={this.client}>
        <App />
      </ApolloProvider>
    )
  }
};
export default AppView;