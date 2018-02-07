import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native'
import Chat from '../utilities/chatIcon'
import Nav from './trainerNav.js'
import SVG from '../SVG/svg4Center.js'

const { width, height } = Dimensions.get('window');



  // async componentDidMount() {
  //   await AsyncStorage.setItem('key' : 'I like to save it.')
  //   //JSON stringify the data into storage and JSON parse it out, THIS IS SO AMAZING
  // }

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.props.nav.cleanUp()
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>  
      <View style={{flex:1}}>
        <SVG />
      </View>  
        <View style={{flex: 2}}>
          <Text style={{fontSize: 30, marginBottom: 50, textAlign:'center'}}>YOU'RE A TRAINER HARRRYYYYY</Text>
          <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
        </View>
        <Nav nav={this.props.nav} index={0}/>
      </View>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: width,
    height: height,
    backgroundColor: 'white'
  },

  nav: {
    position: 'absolute',
    bottom:0,
  }
})

export default Profile