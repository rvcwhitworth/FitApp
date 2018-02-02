import React from 'react';
import {View, Text, Dimensions, AsyncStorage, Image, StyleSheet} from 'react-native';
import NavFooter from './FooterNav.js'
import Chat from '../utilities/chatIcon.js'
import firebase from '../utilities/firebase.js'

const imageStore = firebase.storage()
const database = firebase.database();
// let folder = imageStore.ref('images/'+this.state.userID.toString());

class Photos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: null,
			photos: []
		}
		this.downloadPic = this.downloadPic.bind(this);
	}

	async componentWillMount() {
    AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
      if ( err ) {
        console.log('async storage error: ', err);
      } else {
        this.setState({userID: JSON.parse(val).id}, () => {
        	// use ID look up references to photo names in database
        	database.ref('imgURLs/'+this.state.userID.toString()).once('value', (snapshot) => {
        		// snapshot.val() is an object. iterate throgh object to get all the names of img files in imageStore:
        		let obj = snapshot.val();
        		let fileNames = [];
        		for ( var key in obj ) {
        			fileNames.push(obj[key].name);
        		}
        		// look up said files from the imageStore and store them in asyncStorage/state.
        		console.log('images to grab from imageStore: ', fileNames);
        		fileNames.forEach(name => {
	        		let url = imageStore.ref('images/'+this.state.userID.toString() + '/' + name).getDownloadURL().then((url) => {
	        			this.downloadPic(url, name);
	        		});
        		});
        	});
      });
    }
  });
}

downloadPic(url, name) {
	var xhr = new XMLHttpRequest();
  xhr.responseType = 'text';
  xhr.onload = (event) => {
    let photos = this.state.photos;
    photos.push([name, xhr.response]);
    this.setState({photos: photos});
  };
  xhr.open('GET', url);
  xhr.send();
}

	render() {
    const { width, height } = Dimensions.get('window');
		return (
			<View style={{width: width, height: height, backgroundColor: 'white', flexDirection:'column'}}>
				<View style={{flexDirection: 'row', flex: 1}}>
					{this.state.photos.map((tuple, i) => {
							return (
								<View>
								<Image source={{uri: `data:image/jpg;base64,${tuple[1]}`}} key={i} style={{flex: 1, width: 100, height: 200, left: 20, top: 20}} />
								<Text key={i}>Timestamp: {tuple[0]}</Text>
								</View>)
						})
					}
				</View>
				<Chat nav={this.props.nav}/>
	      <NavFooter nav={this.props.nav} index={3}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({

});

export default Photos