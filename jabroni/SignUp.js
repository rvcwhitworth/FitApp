import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  signUp(e){
    e.preventDefault();
    // make axios request to server to get userID
    // axios.get('/users', {u: e.target..., p: e.target....}).then...
    console.log('LOG IN');
    // navigate to clientHomeScreen
    this.props.navigation.navigate('clientHome');
  }

  render(){
    console.log('SignUpScreen props: ', this.props.navigation);
    return (
    <View>
      <Text>Signup form...</Text>
      <Button title="log in" onPress={this.signUp} />
    </View>);
  }
}

export default SignUpScreen;