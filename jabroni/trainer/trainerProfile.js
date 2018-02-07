import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native'
import Chat from '../utilities/chatIcon'
import Nav from './trainerNav.js'
import SVG from '../SVG/svg4Left.js'
const { width, height } = Dimensions.get('window');



  // async componentDidMount() {
  //   await AsyncStorage.setItem('key' : 'I like to save it.')
  //   //JSON stringify the data into storage and JSON parse it out, THIS IS SO AMAZING
  // };

class TrainerProfile extends React.Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.props.nav.cleanUp()
    const { nav } = this.props;
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    console.log('what is love', this.props)
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>  
      <View style={{flex:1}}>
        <SVG />
      </View>  
        <View style={{flex: 2}}>
          <Text style={{fontSize: 30, marginBottom: 50, textAlign:'center'}}>I AM THE TRAIIINNNAAAAAAA NAAAOOOWWWW</Text>
          <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
        </View>
        <Nav nav={this.props.nav} TopNav={this.props.topNav} index={0}/>
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
  },

  button: {
    padding: 10,
    backgroundColor: 'blue',
    marginBottom: 15,
  }
})

export default TrainerProfile