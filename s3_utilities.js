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


module.exports.upload = (CLOUDINARY_URL_ENDING, user_id, timestamp) => {
	Storage.put(user_id + '/' + CLOUDINARY_URL_ENDING + 'TIMESTAMP=' + timestamp, '', {level: 'public'}).then((result) => {
		console.log('successfully uploaded cloudinary URL to s3!');
	}).catch((err) => {
		console.log('s3 bucket storage error: ', err);
	})
}

module.exports.delete = (user_id, key) => {
	Storage.remove(user_id + '/' +  key).then((result) => {
		console.log('successfully removed item from s3: ', result);
	}).catch((err) => {
		console.log('error removing from s3: ', err);
	});
}

module.exports.setProfilePicture = (base64, user_id) => {
	// upload base64 image to s3 bucket under key 'profilePicture'
	Storage.put(user_id + '/profilePicture', base64, {level: 'public'}).then((result) => {
		console.log('successfully uploaded profile picture!');
	}).catch((err) => {
		console.log('s3 profile picture set error: ', err);
	});
}