module.exports = `
	type User {
		id: Int!
		username: String!
		password: String!
		fullName: String!
		type: String!
		email: String
		profile_data: String
	}

	type Exercise_Plan {
		id: Int!
		name: String!
		regimen: String!
		trainer: User
		client: User
	}

	type Diet_Plan {
		id: Int!
		name: String!
		diet: String!
		trainer: User
		client: User
	}

	type Spotter {
		id: Int!
		trainer: User
		client: User
		type: String!
	}

	type Chat_Room {
		id: Int!
		room_id: Int!
		user: User!
	}

	type Daily_Record {
		id: Int!
		user: User!
		data: String!
		timestamp: String
	}

	type Personal_Record {
		id: Int!
		user: User!
		data: String!
	}

	type Query {
		loginUser(username: String!, password: String!): User
		getExercisePlans(id: Int!, type: String!): [Exercise_Plan]
		getDietPlans(id: Int!, type: String!): [Diet_Plan]
		getSpotters(id: Int!, type: String!): [Spotter]
		getDailyRecords(id: Int!, timestamp: String): [Daily_Record]
		getPersonalRecord(id: Int!): [Personal_Record]
	}

	type Mutation {
		setUser(username: String!, password: String!, fullName: String!, email: String, type: String!, profile_data: String): User
	}
`