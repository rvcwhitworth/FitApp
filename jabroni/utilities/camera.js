import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, Button, Image, AsyncStorage } from 'react-native';
import { Camera, Permissions } from 'expo';
// import * as firebase from 'firebase';
// import TOKENS from '../../TOKENS.js';
import firebase from './firebase.js'

// const firebaseConfig = {
//   apiKey: TOKENS.firebaseConfig.apiKey,
//   authDomain: TOKENS.firebaseConfig.authDomain,
//   databaseURL: TOKENS.firebaseConfig.databaseURL,
//   projectId: TOKENS.firebaseConfig.projectId,
//   storageBucket: TOKENS.firebaseConfig.storageBucket,
//   messagingSenderId: TOKENS.firebaseConfig.messagingSenderId,
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const imageStore = firebase.storage().ref().child('images');
const database = firebase.database();

export default class CameraExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      userID: null,
      reviewMode: false,
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
    console.log('go back!');
    this.props.nav.navigateBack();
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
    // use id to set up path in firebase storage for this user's pictures
    let folder = imageStore.child(this.state.userID.toString());
    let fileName = this.state.pic.exif.DateTimeOriginal; // timestamp

    // save image to fireStore
    let address = folder.child(fileName);
    address.putString(this.state.pic.base64).then((snapshot) => {
      // save reference to file in firebase database so it can be downloaded later:
      database.ref('imgURLs').child(this.state.userID.toString()).push().set({
        name: fileName
      });

      this.setState({
        reviewMode: false,
        pic: null
      });
    }).catch(err => {
      console.log('firebase save error: ', err);
    })
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { width, height } = Dimensions.get('window');
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return this.state.reviewMode ? (
        <View style={{flex: 1, width: width, height: height}}>
          <Image style={{flex: 1, width: width, height: width}} source={{uri:this.state.pic.uri}} />
          <View style={{position: 'absolute', flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Button onPress={this.cancel} title="Delete" color="red"/>
          </View>
          <View style={{position: 'absolute', flexDirection: 'row', alignSelf: 'flex-end'}}>
            <Button onPress={this.save} title="Save" color="green"/>
          </View>
        </View>
        )
      : (
        <View style={{ flex: 1, width: width, height: height }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}} >
            <Button onPress={this.goBack} title="back" />
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <Button onPress={this.snap} title="snap"/>
          </Camera>
        </View>
      );
    }
  }
}