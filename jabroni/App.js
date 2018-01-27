import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
<<<<<<< HEAD
import Home from './navigator'
import landingScreen from './LandingPage';
import logInScreen from './LogIn';
import signUpScreen from './SignUp';
import Plan from './PlanScreen';
import TeamScreen from './TeamScreen';
import DataScreen from './DataScreen';
import Chat from './Chat'
=======
import Home from '../home'
import HomeNavigator from './navigator';
import LandingScreen from './LandingPage';
import LogInScreen from './LogIn';
import signUpScreen from './SignUp';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('HERE');
    return (
      <HomeNavigator />
    );
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
>>>>>>> Add working swiping and integrated views

const ClientHome = TabNavigator({
  Home: {
<<<<<<< HEAD
    screen: Home,
=======
    screen: HomeScreen,
>>>>>>> Add working swiping and integrated views
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
    screen: signUpScreen,
  },

  logIn: {
    screen: LogInScreen,
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

App.router = ClientHome.router;

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