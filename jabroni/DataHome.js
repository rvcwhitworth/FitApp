import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import Chat from './chatIcon'

class logInScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    console.log('logInScreen props: ', this.props.navigation);
    return (
    <View style={{flex:1, backgroundColor: 'white'}}>
      <Text>TESTING THIS OUT</Text>
      <Button title="Back to profile" onPress={()=> this.props.nav.navigate('Profile')} />
    </View>);
  }
}

export default logInScreen;