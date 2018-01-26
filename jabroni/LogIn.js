import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

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

export default logInScreen;