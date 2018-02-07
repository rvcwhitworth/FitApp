import gql from 'graphql-tag';

module.exports.getDailyInput = gql`
	query getDailyRecords($id: Int!, $timestamp: String) {
		getDailyRecords(id: $id, timestamp: $timestamp) {
			id
			data
			created_at
		}
	}
`