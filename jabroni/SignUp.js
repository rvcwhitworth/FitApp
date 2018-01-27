import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'clientHome'})
  ]
})

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
    this.props.navigation.dispatch(resetAction);
  }

  render(){
    console.log('SignUpScreen props: ', this.props.navigation);
    return (
    <View>
      <Text>Signup form... CHANGE</Text>
      <Button title="sign up" onPress={this.signUp} />
    </View>);
  }
}

export default SignUpScreen;