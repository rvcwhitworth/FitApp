import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions, Image } from 'react-native'
import Chat from './chatIcon'
import FooterNav from './FooterNav.js'
import SVG from './SVG/svg5Center.js'


const { width, height } = Dimensions.get('window');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onPress=this.onPress.bind(this);
  }


  componentDidMount() {
    this.props.nav.cleanUp()
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  onPress(e){
    e.preventDefault();
    console.log('you clicked the image!');
  }

  render() {
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
        <View style={{flex:1}}>
          <SVG />
        </View>  
        <TouchableOpacity style={styles.circleContainer} onPress={this.onPress}>
          {/*<View style={styles.circle}/>*/}
          <Image style={styles.circle} source={require('../images/tearingMeApart.jpeg')} />
        </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text style={{fontSize: 30, marginBottom: 50, textAlign:'center'}}>PROFILE</Text>
            <Text style={{padding: 5, textAlign:'center'}}>Swipe left for your diet!</Text>
            <Text style={{padding: 5, textAlign:'center'}}>Swipe right for your daily inputs and progress stuff!</Text>
            <Chat nav={this.props.nav}/>
          </View>
          <FooterNav nav={this.props.nav} index={0}/>
      </View>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: width,
    height: height,
    backgroundColor: 'white',
  },

  nav: {
    position: 'absolute',
    bottom:0,
  },

  button: {
    padding: 10,
    backgroundColor: 'blue',
    marginBottom: 15,
  },

  circle: {
    width: 250,
    height: 250,
    borderRadius: 250/2,
    backgroundColor: 'red'
  },

  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Profile