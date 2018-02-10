import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, Dimensions, Button, Image, AsyncStorage, StyleSheet, Alert } from 'react-native';
import { Camera, Permissions } from 'expo';
const upload = require('../../s3_utilities.js').upload;

// import * as firebase from 'firebase';
// import TOKENS from '../../TOKENS.js';
// import firebase from './firebase.js'

// const firebaseConfig = {
//   apiKey: TOKENS.firebaseConfig.apiKey,
//   authDomain: TOKENS.firebaseConfig.authDomain,
//   databaseURL: TOKENS.firebaseConfig.databaseURL,
//   projectId: TOKENS.firebaseConfig.projectId,
//   storageBucket: TOKENS.firebaseConfig.storageBucket,
//   messagingSenderId: TOKENS.firebaseConfig.messagingSenderId,
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const imageStore = firebase.storage().ref().child('images');
// const database = firebase.database();

export default class CameraExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      userID: null,
      reviewMode: false,
      saveMessageDisplay: false,
      pic: null
    }
    this.goBack = this.goBack.bind(this);
    this.snap = this.snap.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
      if ( err ) {
        console.log('async storage error: ', err);
      } else {
        this.setState({userID: JSON.parse(val).id})

      }
    });
    // should really prompt user for permissions on first log in...auto grant for now:
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  goBack() {
    this.props.navigation.goBack();
  }

  snap() {
    if(this.camera) {
      this.camera.takePictureAsync({quality: 1, base64: true, exif: true})
      .then((pic) => {
      // pic is an object with keys: height, width, uri, base64, and exif.
      // base64 is the encoded image file itself
      // exif contains metadata like DateTimeOriginal (timestamp when photo was taken)
      // height and width are obvious
      // uri is a temporary reference to the local image file.

      // toggle review mode, save pic object to state
      this.setState({reviewMode: true, pic: pic });
      })
      .catch(err => {console.log('camera error: ', err)});
    }
  }

  cancel(e) {
    e.preventDefault();
    this.setState({
      pic: null,
      reviewMode: false
    });
  }

  save(e) {
    e.preventDefault();
    this.setState({saveMessageDisplay: true}, () => {
      setTimeout(() => {
        this.setState({saveMessageDisplay: false})
      }, 2000);
    });
    // Alert.alert('photo saved!');

    this.setState({
      reviewMode: false,
      pic: null
    });

    upload(this.state.pic.exif.DateTimeOriginal, this.state.pic.base64, this.state.userID);

    // // use id to set up path in firebase storage for this user's pictures
    // let folder = imageStore.child(this.state.userID.toString());
    // let fileName = this.state.pic.exif.DateTimeOriginal; // timestamp

    // // save image to fireStore
    // let address = folder.child(fileName);
    // address.putString(this.state.pic.base64).then((snapshot) => {
    //   // save reference to file in firebase database so it can be downloaded later:
    //   database.ref('imgURLs').child(this.state.userID.toString()+'/'+fileName).set({
    //     name: fileName
    //   });

    // }).catch(err => {
    //   console.log('firebase save error: ', err);
    // })
  }

  render() {
    console.log('in camera!');
    const { hasCameraPermission } = this.state;
    const { width, height } = Dimensions.get('window');
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return this.state.reviewMode ? (
        <View style={{flex: 2, width: width, height: height}}>
          <View style={styles.buttonContainer}>
            <Image style={{flex: 1, width: width, height: width}} source={{uri:this.state.pic.uri}} />
            <TouchableHighlight style={styles.deleteButtonContainer} onPress={this.cancel}>
              <Image source={require('../../images/delete.png')} style={styles.deleteButton} />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.save} style={styles.saveButtonContainer}>
              <Image style={styles.saveButton} source={require('../../images/save.png')} color="green" />
            </TouchableHighlight>
          </View>
        </View>
        )
      : (
        <View style={{ flex: 1, width: width, height: height }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}} >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <TouchableOpacity onPress={this.goBack} style={styles.backArrowContainer}>
                <Image source={require('../../images/backArrow.png')} style={styles.backArrow}/>
              </TouchableOpacity>
              {this.state.saveMessageDisplay ? <Text style={{flex: 0, fontSize: 15, color: 'white', alignSelf: 'center', justifyContent: 'center'}}>Saved! </Text> : null }
              <TouchableOpacity
                style={styles.flipButtonContainer}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Image source={require('../../images/flipCamera.png')} style={styles.flipButton}/>
              </TouchableOpacity>
            </View>
            <TouchableHighlight style={styles.circleContainer} onPress={this.snap} activeOpacity={0.4}>
              <View style={styles.circle} />
            </TouchableHighlight>
          </Camera>
        </View>
      );
    }
  }
}

styles = StyleSheet.create({
  flipButtonContainer: {
    flex: 0,
    alignItems: 'flex-end',
    width: 50,
    height: 50
  },
  flipButton: {
    resizeMode: 'contain',
    width: "100%",
    height: "100%"
  },
  backArrowContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    width: 50,
    height: 50
  },
  backArrow: {
    flex: 0,
    resizeMode: 'contain',
    width: "100%",
    height: "100%"
  },
  circleContainer: {
    flex: 0,
    flexDirection: 'row',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    marginBottom: 5,
    alignSelf: 'center'
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 3,
    backgroundColor: "#808080"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  saveButtonContainer: {
    flex: 0,
    position: 'absolute', 
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
  },
  saveButton: {
    resizeMode: 'contain',
    width: "100%",
    height: "100%"
  },
  deleteButtonContainer: {
    flex: 0,
    position: 'absolute', 
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
  },
  deleteButton: {
    resizeMode: 'contain',
    width: "100%",
    height: "100%"
  }
})