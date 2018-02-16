import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, Dimensions } from 'react-native';
import Chat from '../utilities/chatIcon'
import FooterNav from './FooterNav.js'
import SVG from '../SVG/svg5Center.js'
import { Header, Icon } from 'react-native-elements'
import RadarGraph from './radarGraph.js'
const { width, height } = Dimensions.get('window');


class logInScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    // console.log('logInScreen props: ', this.props.navigation);
    return (
    <View style={{flexDirection:'column', backgroundColor: '#FFFCFA', height:height, width:width}}>
    <View style={{flex:1}}>
    <SVG />
    </View>
    <View style={{flex:10}}>
   <Header
  centerComponent={{ text: 'Your Body Balance', style: { color: '#fff', fontSize: 20 } }}
  backgroundColor={'#26547C'}
  />
      <RadarGraph />
      <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
    </View>
      <FooterNav nav={this.props.nav} index={2}/>
    </View>);
  }
}

export default logInScreen;