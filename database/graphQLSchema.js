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
		trainer: User!
		client: User!
	}

	type Diet_Plan {
		id: Int!
		name: String!
		diet: String!
		trainer: User!
		client: User!
	}

	type Spotter {
		id: Int!
		trainer: [User!]
		client: User!
		type: String!
	}

	type Chat_Room {
		id: Int!
		room_id: Int!
		user: User!
	}

	Daily_Record {
		id: Int!
		user: User!
		data: String!
	}

	Personal_Record {
		id: Int!
		user: User!
		data: String!
	}

	
`