import React from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions, AsyncStorage } from 'react-native'
import Chat from '../utilities/chatIcon'
import FooterNav from './FooterNav.js'
import SVG from '../SVG/svg5Center.js'
import firebase from '../utilities/firebase.js'
import { S3Image } from 'aws-amplify-react-native';
const axios = require('axios');
var {downloadPic} = require('../utilities/getPhotos');

const { width, height } = Dimensions.get('window');
const imageStore = firebase.storage();

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profPic: require('../../images/muscle.gif'),
      userInfo: {},
    }
  }

  componentDidMount() {
    // console.log('componentDidMount.');
    this.props.nav.cleanUp()
    const { nav } = this.props;
    AsyncStorage.getItem('@FitApp:ProfPic', (err, val) => {
      if ( err ) {
        console.log('error reading profile picture');
      } else {
        axios.get("https://fitpics.s3.amazonaws.com/public/3/profilePicture").then((response) => {
          // console.log('response: ', response.data);
          this.setState({
            profPic: {uri: `data:image/jpg;base64,${response.data}`}
          });
        }).catch(err => console.log('error downloading profpic'));
        // downloadPic(val, 'profilePicture').then((tuple) => {
        //   this.setState({profPic: { uri: `data:image/jpg;base64,${tuple[1]}` }});
        // }).catch((err) => console.log('download error: ', err));
      }
    });
    // getPhotos().then((err, val) => {
    //   if ( err ) {
    //     console.log('getPhotos error: ', err);
    //   } else {
    //     // console.log('getPhotos success!');
        
    //     // console.log('getPhotos finished.')
    //     // use AsyncStorage to grab prof pic:
    //     AsyncStorage.getItem('@FitApp:UserPhotos', (err, val) => {
    //       if ( err ) {
    //         console.log('async storage error in componentDidMount:', err)
    //       } else {
    //         // console.log('got photos from async storage in component did mount.');
    //         if ( !val ) {
    //           // console.log('no pics yet.');
    //           return;
    //         }
    //         let pics = JSON.parse(val);
    //         // pics is an array of tuples -> [fileName, base64]
    //         // iterate through and look for the profilePicture:
    //         pics.forEach(tuple => {
    //           // console.log('pic name: ', tuple[0]);
    //           if ( tuple[0] === 'profilePicture') {
    //             this.setState({
    //               profPic: { uri: `data:image/jpg;base64,${tuple[1]}` }
    //             }, () => {
    //               console.log('set state of profile picture.')
    //             });
    //           }
    //         });
    //       }
    //     });
    //   }
    // });
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    // console.log('did we get the props we want 22', this.props)
    return ( 
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
        <View style={{flex:1}}>
          <SVG />
        </View>  
        <Text style={styles.fullName}>{this.state.userInfo.fullName}</Text>
        <TouchableOpacity style={styles.circleContainer} onPress={this.onPress}>
          <Image style={styles.circle} source={this.state.profPic} />
        </TouchableOpacity>
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