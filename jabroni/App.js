import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './navigator'
import landingScreen from './LandingPage';
import logInScreen from './LogIn';
import signUpScreen from './SignUp';
import Plan from './PlanScreen';
import TeamScreen from './TeamScreen';
import DataScreen from './DataScreen';
import Chat from './Chat'

const clientHome = TabNavigator({
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
    screen: landingScreen,
  },

  signUp: {
    screen: signUpScreen,
  },

  logIn: {
    screen: logInScreen,
  },

  clientHome: {
    screen: clientHome
  },
  chat:{
    screen: Chat
  }
},  
{
  headerMode: 'none'
});

App.router = clientHome.router;
class AppView extends React.Component {
  constructor (props) {
    super(props)
  } 

  componentWillMount () {
    StatusBar.setHidden(true);
  }

  render () {
    return (
      <App />
    )
  }
};
export default AppView;