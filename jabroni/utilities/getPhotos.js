// use functions from this file to download photos associated with user from firebase
// and store them in asyncStorage.

import {AsyncStorage} from 'react-native';
import firebase from './firebase.js';
const imageStore = firebase.storage();
const database = firebase.database();
let pics = [];

let downloadPic = function(url, name) {
	return new Promise(resolve => {
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = "text";
	  xhr.onload = event => {
	    resolve([name, xhr.response]);
	  };
	  xhr.open("GET", url);
	  xhr.send();
	});
}

async function getPhotos(){
	AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
		if ( err ) {
			console.log('error retrieving UserInfo from AsyncStorage.');
		}
	  else {
	    let id = JSON.parse(val).id.toString();
	    // use id to download photo files from firebase:
	    database.ref("imgURLs/" + id).once("value", function(snapshot) {
					// snapshot.val() is an object. iterate throgh object to get all the names of img files in imageStore:
				for (var fileName in snapshot.val()) {
					// download files from the imageStore and push into array.
					let url = imageStore.ref("images/" + id + "/" + fileName).getDownloadURL()
						.then(async function(url) {
					    let tuple = await downloadPic(url, fileName);
					    pics.push(tuple);
					    // once you have all the pics downloaded, set to AsyncStorage:
					    if ( pics.length === Object.keys(snapshot.val()).length ) {
					    	AsyncStorage.setItem('@FitApp:UserPhotos', JSON.stringify(pics)).then(() => {
					    		console.log('saved photos to async storage.');
					    	})
					    }
						});
				}
			});
		}
	});
}

module.exports = {getPhotos: getPhotos}
