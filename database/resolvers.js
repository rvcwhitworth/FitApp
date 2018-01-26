module.exports = {
	Query: {
		getUser: (parent, { id }, db) => {
			return db.getUserByID(id);
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
		getDailyRecords: (parent, {id, timestamp}, db) => {
			return db.getDailyRecords(id, timestamp);
		},
		getPersonalRecord: (parent, {id}, db) => {
			return db.getPersonalRecord(id);
		}

	}
}
