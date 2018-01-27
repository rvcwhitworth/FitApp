import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

class LandingScreen extends React.Component {
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

export default LandingScreen;