import React from 'react'
<<<<<<< HEAD
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions, Image } from 'react-native'
=======
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions, AsyncStorage } from 'react-native'
>>>>>>> First iteration of auth
import Chat from './chatIcon'
import FooterNav from './FooterNav.js'
import SVG from './SVG/svg5Center.js'
import ClientProfile from './client/clientProfile.js'

const { width, height } = Dimensions.get('window');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onPress=this.onPress.bind(this);
    this.state = {
      type: 'temp'
    }
  }


  componentDidMount() {
    AsyncStorage.getItem('Test:key', (err, val) => {
      if (err) console.log(err);
      else {
        if(JSON.parse(val)){
        this.setState({
          type: JSON.parse(val).type
        })
      }
    }
    })
    this.props.nav.cleanUp()
  //   const { nav } = this.props;

  //   nav.onNavigateShouldAllow(() => {
  //      return true;
  //   });

  //   nav.onNavigateLeftStartedListener(({interpolation, start, end, isBack, isMain}) => {

  //     console.log('PROFILE')
  //     console.log('inside LeftStartedListener')
  //     console.log('interpolation', interpolation)
  //     console.log('start', start)
  //     console.log('end', end)
  //     console.log('isBack', isBack)
  //     console.log('isMain', isMain)

  //     if(isBack && !isMain) {
  //       console.log('what')
  //     } else if(isBack) {
  //       console.log('the?')
  //     }
  //   })

  //   nav.onNavigateLeftCompletedListener(({completed, isBack}) => {
  //     console.log('PROFILE')
  //     console.log('completed', completed)
  //     console.log('isBack', isBack)
  //     if(!completed && isBack) {
  //       this.setState({color: '#9575CD'})
  //     }
  //   })

  //   nav.onNavigateRightStartedListener(({isBack, isMain}) => {
  //     console.log('PROFILE')
  //     console.log('isBack', isBack)
  //     console.log('isMain', isMain)
  //     if(!isMain) {
  //       this.setState({color: 'transparent'})
  //     }
  //   })

  //   nav.onNavigateRightCompletedListener(({completed}) => {
  //     console.log('PROFILE')
  //     if(completed) {
  //       this.setState({color: '#9575CD'})
  //     }
  //   })
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  onPress(e){
    e.preventDefault();
    console.log('you clicked the image!');
  }

  render() {
    console.log('what is the state of affairs', this.state)
    if(this.state.type=== 'trainer'){
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>  
      <View style={{flex:1}}>
        <SVG />
      </View>  
        <View style={{flex: 2}}>
          <Text style={{fontSize: 30, marginBottom: 50, textAlign:'center'}}>I AM THE TRAIIINNNAAAAAAA</Text>
          <Chat nav={this.props.nav}/>
        </View>
        <FooterNav nav={this.props.nav} index={0}/>
      </View>
    )} else{
      return(
        <ClientProfile nav={this.props.nav}/>)
    }

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