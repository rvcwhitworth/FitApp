import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native'
import Chat from '../chatIcon'
import FooterNav from '../FooterNav.js'
import SVG from '../SVG/svg5Center.js'



  // async componentDidMount() {
  //   await AsyncStorage.setItem('key' : 'I like to save it.')
  //   //JSON stringify the data into storage and JSON parse it out, THIS IS SO AMAZING
  // }
const { width, height } = Dimensions.get('window');

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.props.nav.cleanUp()
    const { nav } = this.props;

    // nav.onNavigateShouldAllow(() => {
    //    return true;
    // });

    // nav.onNavigateLeftStartedListener(({interpolation, start, end, isBack, isMain}) => {

    //   console.log('PROFILE')
    //   console.log('inside LeftStartedListener')
    //   console.log('interpolation', interpolation)
    //   console.log('start', start)
    //   console.log('end', end)
    //   console.log('isBack', isBack)
    //   console.log('isMain', isMain)

    //   if(isBack && !isMain) {
    //     console.log('what')
    //   } else if(isBack) {
    //     console.log('the?')
    //   }
    // })

    // nav.onNavigateLeftCompletedListener(({completed, isBack}) => {
    //   console.log('PROFILE')
    //   console.log('completed', completed)
    //   console.log('isBack', isBack)
    //   if(!completed && isBack) {
    //     this.setState({color: '#9575CD'})
    //   }
    // })

    // nav.onNavigateRightStartedListener(({isBack, isMain}) => {
    //   console.log('PROFILE')
    //   console.log('isBack', isBack)
    //   console.log('isMain', isMain)
    //   if(!isMain) {
    //     this.setState({color: 'transparent'})
    //   }
    // })

    // nav.onNavigateRightCompletedListener(({completed}) => {
    //   console.log('PROFILE')
    //   if(completed) {
    //     this.setState({color: '#9575CD'})
    //   }
    // })
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>  
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

export default Profile