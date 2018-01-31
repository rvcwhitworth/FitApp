import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, Button } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    }
    this.goBack = this.goBack.bind(this);
    this.snap = this.snap.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  goBack() {
    console.log('go back!');
    this.props.nav.navigate('Home');
  }

  snap() {
    if(this.camera) {
      this.camera.takePictureAsync({quality: 0.5, base64: true, exif: true}).then((pic) => {
      // pic is an object with keys: height, width, uri, base64, and exif.
      // base64 is the encoded image file itself
      // exif contains metadata like DateTimeOriginal (timestamp when photo was taken)
      // height and width are obvious
      // uri is a temporary reference to the local image file.
      
      // save image to fireStore
        console.log(pic);
      }).catch(err => {console.log(err)});
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { width, height } = Dimensions.get('window');
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
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