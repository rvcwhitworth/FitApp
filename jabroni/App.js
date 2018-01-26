import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from '../home'
import SwipeNavigator from './navigator'


class landingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    const { navigate } = this.props.navigation;
    return (
    <View>
      <Button title="sign up" onPress={() => {
        navigate('signUp');
      }}/>
      <Button title="log in" onPress={() => {
        navigate('logIn');
      }}/>
      <Text style={{"color": "red", "fontWeight": "bold", "fontSize": 32}}>Fitness App</Text>
    </View>);
  }
}

class logInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn(e){
    e.preventDefault();
    // make axios request to server to get userID
    // axios.get('/users', {u: e.target..., p: e.target....}).then...
    console.log('LOG IN');
    // navigate to clientHomeScreen
    this.props.navigation.navigate('clientHome');
  }

  render(){
    console.log('logInScreen props: ', this.props.navigation);
    return (
    <View>
      <Text>Login form...</Text>
      <Button title="log in" onPress={this.logIn} />
    </View>);
  }
}

class signUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  signUp(e){
    e.preventDefault();
    console.log('SIGN UP');
  }
  
  render(){
    return (
    <View>
      <Text>Signup form...</Text>
      <Button title="sign up" onPress={this.signUp} />
    </View>);
  }
}

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
  },

});

App.router = clientHome.router;
export default App;