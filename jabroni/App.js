import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from '../home'
import SwipeNavigator from './navigator'
import landingScreen from './LandingPage';
import logInScreen from './LogIn';
import signUpScreen from './SignUp';

class ClientHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
    <View>
      <SwipeNavigator />
    </View>);
  }
}

class PlanScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
    <View>
      <Text>Client plan screen goes here!</Text>
    </View>);
  }
}

class DataScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
    <View>
      <Text>Client data screen goes here!</Text>
    </View>);
  }
}

class TeamScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
    <View>
      <Text>Client team screen goes here!</Text>
    </View>);
  }
}

const clientHome = TabNavigator({
  Home: {
    screen: SwipeNavigator,
    title: 'Home'
  },

  Plan: {
    screen: PlanScreen,
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