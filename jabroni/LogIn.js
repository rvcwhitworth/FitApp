import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'clientHome'})    
  ]
})

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
    console.log('NAV STATE', this.props.navigation.state)
    // navigate to clientHomeScreen
    this.props.navigation.dispatch(resetAction);
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