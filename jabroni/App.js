import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Home from './navigator'
import LandingScreen from './LandingPage';
import LogInScreen from './LogIn';
import SignUpScreen from './SignUp';
import Plan from './PlanScreen';
import TeamScreen from './TeamScreen';
import DataScreen from './DataScreen';
import Chat from './Chat'
import TestNavigator from './planNavigator'

const ClientHome = TabNavigator({
  Home: {
    screen: Home,
    title: 'Home'
  },

  Plan: {
    screen: Plan,
    title: 'Plan'
  },

  Data: {
    screen: DataScreen,
    title: 'Data'
  },

  Team: {
    screen: TeamScreen,
    title: 'Team'
  }
});

const App = StackNavigator({
  landing: {
    screen: LandingScreen,
  },

  signUp: {
    screen: SignUpScreen,
  },

  logIn: {
    screen: LogInScreen,
  },

  clientHome: {
    screen: Home
  },
  chat:{
    screen: Chat
  }
},  
{
  headerMode: 'none'
});

App.router = ClientHome.router;

class AppView extends React.Component {
  constructor (props) {
    super(props)

    /** GraphQL Client */
    this.client = new ApolloClient({
      link: new HttpLink({ uri:'http://ec2-18-219-7-36.us-east-2.compute.amazonaws.com:4000/graphql'}),
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