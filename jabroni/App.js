import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo'
import LandingScreen from './LandingPage';
import { client } from './utilities/dataStore.js';
import ClientLogInScreen from './client/ClientLogIn.js';
import TrainerLogInScreen from './trainer/TrainerLogIn.js'
import SignUpScreen from './SignUp';
import Plan from './client/PlanScreen';
import TeamScreen from './client/TeamScreen';
import DataScreen from './client/DataScreen';
import Chat from './utilities/Chat'
import Home from './Navigator.js'

const TrainerHome = Home('test')
const ClientHome = Home('client')

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

  chat:{
    screen: Chat
  }
},  
{
  headerMode: 'none'
});

App.router = Home.router;

class AppView extends React.Component {
  constructor (props) {
    super(props)
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