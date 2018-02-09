import Amplify, {Storage} from 'aws-amplify';
const axios = require('axios');

Amplify.configure({
  Auth: require('./TOKENS.js').s3,
  Storage: {
  	bucket: 'fitpics',
  }
});


module.exports.getPhotosList = (id) => {
	return Storage.list('3/').then((photo) => {
		return photo;
	}).catch((err) => {
		console.log(err);
	});
}

module.exports.upload = (timestamp, base64, user_id) => {
	Storage.put(user_id+'/'+timestamp, base64).then((result) => {
		console.log('success!');
	}).catch((err) => {
		console.log('s3 bucket storage error: ', err);
	})
}