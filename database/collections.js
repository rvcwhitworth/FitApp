var knex = require('./config.js').knex;
var bookshelf = require('./schema.js').bookshelf;
var models = require('./models.js');
var _ = require('underscore');
var bcrypt = require('bcrypt');

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
Daily_Records.model = models.Daily_Record;

var Personal_Records = new bookshelf.Collection();
Personal_Records.model = models.Personal_Record;

var Chat_Rooms = new bookshelf.Collection();
Chat_Rooms.model = models.Chat_Room;
///////////////////////////////////////////////////

/////////////////////////////////////////////////////
// most database functions below return promises:

module.exports.usernameTaken = (username, cb) => {
	// check if a username is already taken
	return new models.User({username: username}).fetch()
}

module.exports.setUser = (obj) => {
	// create a new user
	return module.exports.usernameTaken(obj.username).then((found) => {
		if (!found) {
			return bcrypt.hash(obj.password, 12)
			.then((hash) => {
				return Users.create({
					username: obj.username,
					password: hash,
					fullName: obj.fullName,
					email: obj.email,
					type: obj.type,
					profile_data: obj.profile_data
				}).then((result) => {
					return result.attributes;
				})
				.catch((err) => console.error('Error creating user', err));
			})
		} else {
			return null
		}
	});
}

module.exports.connectionRequest = (obj) =>{
	if(obj.delete){
		console.log('inside delete')
	return new models.User({id: obj.id}).fetch().then((model) =>{
		let temp = model.get('connection_requests') || '[]'
		if(temp){
			temp = JSON.parse(temp)
		}
		let identity = JSON.parse(obj.connection_requests)
		temp2 = _.filter(temp, (val) => {
			console.log('whats this filter val', val)
			let foo = JSON.parse(val)
			if(foo.id !== identity.id){
				return true
			} else{
				return false
			}
		})
		console.log('what are we setting this as?', temp2)
	    model.set('connection_requests', JSON.stringify(temp2))
	    model.save()
	    return model.attributes;
	}) 
	} else{
	console.log('inside collections', obj)
	return new models.User({id: obj.id}).fetch().then((model) =>{
		let temp = model.get('connection_requests') || '[]'
		if(temp){
			temp = JSON.parse(temp)
		}
		console.log('whats temp doe', temp)
		temp.push(obj.connection_requests)
	    model.set('connection_requests', JSON.stringify(temp))
	    model.save()
	    return model.attributes;
	}) 
  }
} 
module.exports.updateUser = (obj) => {
	// update the profile_data column
	return models.User.where({id: obj.user_id}).fetch().then((model) => {
		let data = JSON.parse(model.attributes.profile_data);
		data['profilePictureURL'] = obj.profile_data;
		return model.save('profile_data', JSON.stringify(data), {}, {method: "update"}).then((newModel) => {
			return newModel.attributes;
		});		
	});
}

module.exports.getUserByID = (id) => {
	// lookup a user by their user_id
	return new models.User({id: id}).fetch().then((obj) => {
		return obj.attributes;
	});
}

module.exports.getUsersByFullName = (fullName) => {
	return models.User.where({fullName}).fetchAll().then(({models}) => {
		// console.log('Users', models, 'Plucking', _.pluck(models, 'attributes'));
		return _.pluck(models, 'attributes');
	})
}

module.exports.loginUser = (username, password) => {
	// validate a username/password combo
	return new models.User({username: username}).fetch().then((user) => {
		if (user) {
			// console.log('USER BEFORE COMPARE', user)
			return bcrypt.compare(password, user.attributes.password).then((match) => {
				if (match) {
					return user.attributes;
				} else {
					return null;
				}
			});
		} else {
			return null;
		}
	}).catch((err) => console.error('Error on log in', err))
}

module.exports.setExercisePlan = (obj) => {
	console.log('is this activating????')
	return Exercise_Plans.create({
		name: obj.name,
		regimen: obj.regimen,
		trainer_id: obj.trainer_id,
		client_id: obj.client_id
	}).then((result) => {
		return result.attributes;
	});
}

module.exports.getExercisePlans = (id, type) => {
	if ( type === "trainer" ) {
		// lookup plan using trainer_id
		return models.Exercise_Plan.where({trainer_id: id}).fetchAll().then((obj) => {
			let result = [];
			obj.models.forEach(model => {
				result.push(model.attributes);
			});
			return result;
		});
	} else if ( type === "client" ) {
		// lookup plan using client_id
		return models.Exercise_Plan.where({client_id: id}).fetchAll().then((obj) => {
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
	}).then((result) => {
		return result.attributes;
	});
}

module.exports.getDietPlans = (id, type) => {
	if ( type === "trainer" ) {
		// lookup plan using trainer_id
		return models.Diet_Plan.where({trainer_id: id}).fetchAll().then((obj) => {
			let result = [];
			obj.forEach(model => {
				result.push(model.attributes);
			});
			return result;
		});
	} else if ( type === "client" ) {
		// lookup plan using client_id
		return models.Diet_Plan.where({client_id: id}).fetchAll().then((obj) => {
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
	}).then((result) => {
		return result.attributes;
	});
}

module.exports.getSpotters = (id, type) => {
	let result = [];
	// if ( type === "trainer" ) {
		return models.Spotter.where({trainer_id: id}).fetchAll().then((obj) => {
			obj.forEach(model => {
				result.push(model.attributes);
			});
			return models.Spotter.where({client_id: id}).fetchAll().then((obj) => {
			  obj.forEach(model => {
				result.push(model.attributes);
			  });
			  return result;
			
		      });
			// return result;

		});
	// } else if ( type === "client" ) {
	// 	return models.Spotter.where({client_id: id}).fetchAll().then((obj) => {
	// 		obj.forEach(model => {
	// 			result.push(model.attributes);
	// 		});
	// 		return result;
	// 	});
	// }
}

module.exports.setChatRoom = (obj) => {
	return Chat_Rooms.create({
		user_id: obj.user_id,
		room_id: obj.room_id
	}).then((result) => {
		return result.attributes;
	});
}


module.exports.getChatRooms = (id) => {
	let result = [];
	return models.Chat_Room.where({user_id: id}).fetchAll().then((obj) => {
		obj.forEach(model => {
			result.push(model.attributes);
		});
		return result;
	});
} 

module.exports.getChatRoomsByRoomId = (id) => {
	let result = [];
	return models.Chat_Room.where({room_id: id}).fetchAll().then((obj) => {
		obj.forEach(model => {
			result.push(model.attributes);
		});
		return result;
	});
}

// var results = []
// return models.Chat_Room.where({user_id: id}).fetchAll().then((rooms) => {
// 	rooms.forEach( (room) => {
// 		result.push(room.attributes) 
// 		console.log('First ForEach')
// 	});
	
	// result.forEach( (room)=>{
	// 	models.Chat_Room.where({room_id: room.room_id}).fetchAll().then( (newRooms)=>{
	// 		newRooms.forEach( (newRoom)=>{
	// 			console.log("Second For Each", newResults)
	// 			newResults.push(newRoom.attributes)
	// 		})
	// 	})
	// })
// })
// console.log('results==>>', results)
// return results;


module.exports.setDailyRecord = (obj) => {
	return Daily_Records.create({
		user_id: obj.user_id,
		data: obj.data
	}).then((result) => {
		return result.attributes;
	});
}

module.exports.getDailyRecords = (id) => {
	let result = [];
	return models.Daily_Record.where({user_id: id}).fetchAll().then((obj) => {
		obj.forEach(model => {
			result.push(model.attributes);
		});
		return result;
	});
}

module.exports.setPersonalRecord = (obj) => {
	// update the row if it exists, otherwise just create it
	return module.exports.getPersonalRecord(obj.user_id).then((result) => {
		if (result) {
			return new models.Personal_Record({id: result.id, user_id: obj.user_id, data: obj.data}).save().then((result) => {
				return result.attributes;
			});
		} else {
			return Personal_Records.create({
				user_id: obj.user_id,
				data: obj.data
			}).then((result) => {
				return result.attributes;
			});
		}
	})
}

module.exports.getPersonalRecord = (id) => {
	return models.Personal_Record.where({user_id: id}).fetch().then((obj) => {
		if ( obj ) {
			return obj.attributes;
		} else {
			return null;
		}
	});
}