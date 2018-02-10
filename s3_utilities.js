import Amplify, {Storage} from 'aws-amplify';
const axios = require('axios');

Amplify.configure({
  Auth: require('./TOKENS.js').s3,
  Storage: {
  	bucket: 'fitpics',
  }
});


module.exports.getPhotosList = (id) => {
	return Storage.list(id + '/');
}

module.exports.upload = (timestamp, base64, user_id) => {
	Storage.put(user_id + '/' + timestamp, base64, {level: 'public'}).then((result) => {
		console.log('success!');
	}).catch((err) => {
		console.log('s3 bucket storage error: ', err);
	})
}

module.exports.getPhotoURL = (key) => {
	return Storage.get(key).then((url) => {
		return url;
	}).catch((err) => {
		console.log('s3 bucket storage get error: ', err);
	});
}