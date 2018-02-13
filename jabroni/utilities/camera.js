import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, Dimensions, Button, Image, AsyncStorage, StyleSheet, Alert } from 'react-native';
import { Camera, Permissions } from 'expo';
const {cloudinary} = require('../../TOKENS.js');
const s3_upload = require('../../s3_utilities.js').upload;
const CryptoJS = require('crypto-js');


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
    this.upload = this.upload.bind(this);
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

  upload(uri) {
    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = cloudinary.API_KEY;
    let api_secret = cloudinary.API_SECRET;
    let cloud = cloudinary.CLOUD_NAME;
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      // store cloudinary public url in s3
      s3_upload('v' + JSON.parse(xhr._response).version + '\'' + JSON.parse(xhr._response).public_id + '.jpg', this.state.userID, Date.now().toString());
    };
    let formdata = new FormData();
    formdata.append('file', {uri: uri, type: 'image/png', name: 'upload.png'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
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

    this.setState({
      reviewMode: false,
      pic: null
    });

    this.upload(this.state.pic.uri);
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