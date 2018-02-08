import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, Dimensions } from 'react-native';
import Chat from '../utilities/chatIcon'
import FooterNav from './FooterNav.js'
import SVG from '../SVG/svg5Center.js'
const { width, height } = Dimensions.get('window');


class logInScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    // console.log('logInScreen props: ', this.props.navigation);
    return (
    <View style={{flexDirection:'column', backgroundColor: 'white', height:height, width:width}}>
    <SVG />
    <View style={{flex:1}}>
      <Text> Dynamic Infographic summarazing your overall progress??</Text>
      <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
    </View>
      <FooterNav nav={this.props.nav} index={2}/>
    </View>);
  }
}

export default logInScreen;