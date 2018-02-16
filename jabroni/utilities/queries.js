import gql from 'graphql-tag';


const getDailyRecords = gql`
	query getDailyRecords($id: Int!, $timestamp: String) {
		getDailyRecords(id: $id, timestamp: $timestamp) {
			id
			data
			created_at
		}
	}
`

const searchQuery = gql`
  query getUsersByFullName($fullName: String!){
    getUsersByFullName(fullName: $fullName) {
      id
      fullName
      email
      profile_data
      username
    }
  }
`
const spotterQuery = gql`
query getSpotters($id: Int!){
  getSpotters(id: $id, type: "client") {
    trainer {
      username
      fullName
      id
    }
  }
}
`

const addSpotter = gql`
mutation setSpotter($trainer_id: Int!, $client_id: Int!){
  setSpotter(trainer_id: $trainer_id, client_id: $client_id, type: "support") {
    trainer {
      id
      fullName
      email
      profile_data
      username
    }
  }
}`;

const getDietPlans = gql`
	query getDietPlans($id: Int!){
	  getDietPlans(id: $id, type: "client") {
	    diet
	    trainer {
	      fullName
	    }
	  }
	}`;

module.exports = {
	getDailyRecords,
	spotterQuery,
	addSpotter,
	getDietPlans,
	searchQuery
}