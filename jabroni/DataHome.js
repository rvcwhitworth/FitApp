import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, Dimensions } from 'react-native';
import Chat from './chatIcon'
import FooterNav from './FooterNav.js'
const { width, height } = Dimensions.get('window');

class logInScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    console.log('logInScreen props: ', this.props.navigation);
    return (
    <View style={{flexDirection:'column', backgroundColor: 'white', height:height, width:width}}>
    <View style={{flex:1}}>
      <Text>TESTING THIS OUT</Text>
      <Button title="Back to profile" onPress={()=> this.props.nav.navigate('Profile')} />
    </View>
      <FooterNav nav={this.props.nav} index={2}/>
    </View>);
  }
}

export default logInScreen;