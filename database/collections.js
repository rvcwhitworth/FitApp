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

module.exports.setUser = (obj) => {
	return Users.create({
		username: obj.username,
		password: obj.password,
		fullName: obj.fullName,
		email: obj.email,
		type: obj.type,
		profile_data: obj.profile_data
	});
}

module.exports.getUserByID = (id) => {
	return new models.User({id: id}).fetch().then((obj) => {
		return obj.attributes;
	});
}

module.exports.setExercisePlan = (obj) => {
	return Exercise_Plans.create({
		name: obj.name,
		regimen: obj.regimen,
		trainer_id: obj.trainer_id,
		client_id: obj.client_id
	});
}

module.exports.getExercisePlans = (id, type) => {
	if ( type === "trainer" ) {
		// lookup plan using trainer_id
		return new models.Exercise_Plan({trainer_id: id}).fetchAll().then((obj) => {
			let result = [];
			obj.models.forEach(model => {
				result.push(model.attributes);
			});
			return result;
		});
	} else if ( type === "client" ) {
		// lookup plan using client_id
		return new models.Exercise_Plan({client_id: id}).fetchAll().then((obj) => {
			let result = [];
			obj.models.forEach(model => {
				result.push(model.attributes);
			});
			return result;
		});
	}
}

module.exports.setDietPlan = (obj) => {
	return Diet_Plans.create({
		name: obj.name,
		diet: obj.diet,
		trainer_id: obj.trainer_id,
		client_id: obj.client_id
	});
}

module.exports.getDietPlans = (id, type) => {
	if ( type === "trainer" ) {
		// lookup plan using trainer_id
		return new models.Diet_Plan({trainer_id: id}).fetchAll().then((obj) => {
			let result = [];
			obj.forEach(model => {
				result.push(model.attributes);
			});
			return result;
		});
	} else if ( type === "client" ) {
		// lookup plan using client_id
		return new models.Diet_Plan({client_id: id}).fetchAll().then((obj) => {
			let result = [];
			obj.forEach(model => {
				result.push(model.attributes);
			});
			return result;
		});
	}
}

module.exports.setSpotter = (obj) => {
	return Spotters.create({
		trainer_id: obj.trainer_id,
		client_id: obj.client_id,
		type: obj.type
	});
}

module.exports.getSpotters = (id, type) => {
	if ( type === "trainer" ) {
		return models.Spotter({trainer_id: id}).fetchAll().then((obj) => {
			return obj.attributes;
		});
	} else if ( type === "client" ) {
		return models.Spotter({client_id: id}).fetchAll().then((obj) => {
			return obj.attributes;
		});
	}
}

// module.exports.createChatRoom = (obj) => {
// 	// deal with firebase...?
// 	return Chat_Rooms.create({

// 	});
// }

module.exports.setDailyRecord = (obj) => {
	return Daily_Records.create({
		user_id: obj.user_id,
		data: obj.data
	});
}

module.exports.getDailyRecords = (id, timestamp) => {
	if ( timestamp ) {
		return models.Daily_Record({user_id: id, timestamp: timestamp}).fetchAll().then((obj) => {
			return obj.attributes;
		});
	} else {
		return models.Daily_Record({user_id: id}).fetchAll().then((obj) => {
			return obj.attributes;
		});
	}
}

module.exports.setPersonalRecord = (obj) => {
	return Personal_Records.create({
		user_id: obj.user_id,
		data: obj.data
	});
}

module.exports.getPersonalRecord = (id) => {
	return models.Personal_Record({user_id: id}).fetchAll().then((obj) => {
		return obj.attributes;
	});
}