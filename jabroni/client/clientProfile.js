import React from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions, AsyncStorage } from 'react-native'
import Chat from '../utilities/chatIcon'
import FooterNav from './FooterNav.js'
import SVG from '../SVG/svg5Center.js'

const { width, height } = Dimensions.get('window');

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profPic: null,
      userInfo: {},
    }
  }

  componentDidMount() {
    this.props.nav.cleanUp()
    const { nav } = this.props;
    AsyncStorage.getItem("@FitApp:UserInfo", (err, val) => {
      if ( err ) {
        console.log('async storage error: ', err);
      } else {
        AsyncStorage.getItem("@FitApp:profilePictureURL", (err, url) => {
          if ( err ) {
            console.log('error retrieving profile picture URL from async storage');
          } else {
            console.log('your profile picture URL is: ', JSON.parse(url));
            this.setState({
              profPic: JSON.parse(url),
              userId: JSON.parse(val).id
            });
          }
        }).catch(err => console.log('async storage error: ', err))
      }
    });
  }

  //refetch profile picture when it is changed in photo gallery
  componentWillReceiveProps () {
    AsyncStorage.getItem("@FitApp:profilePictureURL", (err, url) => {
          if ( err ) {
            console.log('error retrieving profile picture URL from async storage');
          } else {
            console.log('your profile picture URL is: ', url);
            this.setState({
              profPic: JSON.parse(url),
            });
          }
    }).catch(err => console.log('async storage error: ', err))
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    console.log('profile picture url: ', this.state.profPic);
    return ( 
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
        <View style={{flex:1}}>
          <SVG />
        </View>  
        <Text style={styles.fullName}>{this.state.userInfo.fullName}</Text>
        {this.state.profPic === null ? 
        <TouchableOpacity style={styles.circleContainer} onPress={this.onPress}>
          <Image style={styles.circle} source={require('../../images/muscle.gif')} onLoadEnd={() => console.log('loaded')}/>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.circleContainer} onPress={this.onPress}>
          <Image style={styles.circle} source={{uri: "https://res.cloudinary.com/dvhehr6k8/image/fetch/"+this.state.profPic}} onLoadEnd={() => console.log('loaded')}/>
        </TouchableOpacity>}
          <View style={{flex: 2}}>
            <Text style={styles.textBox}>Swipe left for your diet!</Text>
            <Text style={styles.textBox}>Swipe right for your daily inputs and progress stuff!</Text>
            <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
          </View>
          <FooterNav nav={this.props.nav} index={0} />
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
    bottom:0
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    marginBottom: 15
  },
  circle: {
    height: 250,
    width: 250,
    borderRadius: 250/2
  },
  circleContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fullName:  {
    flex: 0,
    fontSize: 30,
    marginBottom: 15, 
    textAlign:'center'
  },
  textBox: {
    flexDirection: 'row',
    flex: 0,
    textAlign:'center',
    marginBottom: 5,
    fontSize: 20
  }
});

export default Profile