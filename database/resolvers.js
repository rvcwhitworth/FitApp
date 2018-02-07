module.exports = {
	Query: {
		loginUser: (parent, { username, password }, db) => {
			return db.loginUser(username, password);
		},
		getExercisePlans: (parent, { id, type }, db) => {
			return db.getExercisePlans(id, type);
		},
		getDietPlans: (parent, { id, type }, db) => {
			return db.getDietPlans(id, type);
		},
		getSpotters: (parent, { id, type }, db) => {
			return db.getSpotters(id, type);
		},
		getDailyRecords: (parent, {id}, db) => {
			return db.getDailyRecords(id);
		},
		getPersonalRecord: (parent, {id}, db) => {
			return db.getPersonalRecord(id);
		},
		getChatRooms: (parent, {id}, db) => {
			 
			return db.getChatRooms(id).then((rooms)=>{
				// console.log("in then", rooms)
				
				return Promise.all(rooms.map( (ele)=>{
					// console.log("in Map", ele)
					return db.getChatRoomsByRoomId(ele.room_id)
				}))
			}).then((rooms)=>{
				// console.log("here", rooms)
				return rooms;
			});
		},
		getUsersByFullName: (parent, {fullName}, db) => {
			return db.getUsersByFullName(fullName);
		}
	},

	Mutation: {
		setUser: (parent, obj, db) => {
			return db.setUser(obj);
		},
		setExercisePlan: (parent, obj, db) => {
			return db.setExercisePlan(obj);
		},
		setDietPlan: (parent, obj, db) => {
			return db.setDietPlan(obj);
		},
		setSpotter: (parent, obj, db) => {
			return db.setSpotter(obj);
		},
		setDailyRecord: (parent, obj, db) => {
			return db.setDailyRecord(obj);
		},
		setPersonalRecord: (parent, obj, db) => {
			return db.setPersonalRecord(obj);
		},
		setChatRoom: (parent, obj, db) => {
			return db.setChatRoom(obj);
		}
	},

	Diet_Plan: {
		client: (parent, args, db) => {
			console.log(parent)
			return db.getUserByID(parent.client_id);
		},

		trainer: (parent, args, db) => {
			console.log(parent)
			return db.getUserByID(parent.trainer_id);
		}
	},

	Exercise_Plan: {
		client: (parent, args, db)=>{
			return db.getUserByID(parent.client_id)
		},
		trainer: (parent, args, db) =>{
			return db.getUserByID(parent.trainer_id)
		}
	},

	Spotter: {
		client: (parent, args, db)=>{
			return db.getUserByID(parent.client_id)
		},
		trainer: (parent, args, db)=>{
			return db.getUserByID(parent.trainer_id)
		}
	},

	Daily_Record:{
		user:(parent, args, db)=>{
			return db.getUserByID(parent.user_id)
		}
	},

	Personal_Record:{
		user: (parent, args, db)=> {
			return db.getUserByID(parent.user_id);
		}
	},

	Chat_Room:{
		user: (parent, args, db) => {
			return db.getUserByID(parent.user_id);
		}
	}
}