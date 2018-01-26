var bookshelf = require('./schema.js').bookshelf;
var models = require('./models.js');
////////////////////////////////////////////////
// create collections:
var Users = new bookshelf.Collection();
Users.model = models.User;

var Exercise_Plans = new bookshelf.Collection();
Exercise_Plans.model = models.Exercise_Plan;

var Diet_Plans = new bookshelf.Collection();
Diet_Plans.model = models.Diet_Plan;

var Spotters = new bookshelf.Collection();
Spotters.model = models.Spotter;

var Daily_Records = new bookshelf.Collection();
Daily_Records.model = models.Daily_Records;

var Personal_Records = new bookshelf.Collection();
Personal_Records.model = models.Personal_Record;

var Chat_Rooms = new bookshelf.Collection();
Chat_Rooms.model = models.Chat_Room;
///////////////////////////////////////////////////

/////////////////////////////////////////////////////
// most database functions below return promises:

module.exports.usernameTaken = (username, cb) => {
	new models.User({username: username}).fetch().then((found) => {
		if (found) {
			cb(true);
		} else {
			cb(false);
		}
	});
}

module.exports.createUser = (obj) => {
	return Users.create({
		username: obj.username,
		password: obj.password,
		fullName: obj.fullName,
		email: obj.email,
		type: obj.type,
		profile_data: obj.profile_data
	});
}

module.exports.createExercisePlan = (obj) => {
	return Exercise_Plans.create({
		name: obj.name,
		regimen: obj.regimen,
		trainer_id: obj.trainer_id,
		client_id: obj.client_id
	});
}

// module.exports.getExercisePlan = (obj) => {
// 	return models.Exercise_Plan({}).fetch().then(() => {
// 
// 	})
// }

module.exports.createDietPlan = (obj) => {
	return Diet_Plans.create({
		name: obj.name,
		diet: obj.diet,
		trainer_id: obj.trainer_id,
		client_id: obj.client_id
	});
}

// module.exports.getDietPlan = (obj) => {
// 	return models.Diet_Plan({}).fetch().then(() => {

// 	})
// }

module.exports.addSpotter = (obj) => {
	return Spotters.create({
		trainer_id: obj.trainer_id,
		client_id: obj.client_id,
		type: obj.type
	});
}

// module.exports.getSpotters = (obj) => {
// 	return models.Spotter({}).fetch().then(() => {

// 	})
// }

// module.exports.createChatRoom = (obj) => {
// 	// deal with firebase...?
// 	return Chat_Rooms.create({

// 	});
// }

module.exports.createDailyRecord = (obj) => {
	return Daily_Records.create({
		user_id: obj.user_id,
		data: obj.data
	});
}

module.exports.createPersonalRecord = (obj) => {
	return Personal_Records.create({
		user_id: obj.user_id,
		data: obj.data
	});
}

// module.exports.getPersonalRecord = (obj) => {
// 	return models.Personal_Record({}).fetch().then(() => {
		
// 	})
// }