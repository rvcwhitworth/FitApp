import gql from 'graphql-tag';

const getDailyRecords = gql`
	query getDailyRecords($id: Int!, $timestamp: String) {
		getDailyRecords(id: $id, timestamp: $timestamp) {
			id
			data
			created_at
		}
	}
`;

const getDietPlans = gql`
	query getDietPlans($id: Int!){
	  getDietPlans(id: $id, type: "client") {
	    diet
	    trainer {
	      fullName
	    }
	  }
	}
`;

const getSpotters = gql`
	query getSpotters($id: Int!){
	  getSpotters(id: $id, type: "client") {
	    id
	    trainer{
	      id
	    }
	  }
	}
`;

module.exports = {
	getSpotters,
	getDietPlans,
	getDailyRecords
}