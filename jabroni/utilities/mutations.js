import gql from 'graphql-tag';

const setDailyRecord = gql`
	mutation setDailyRecord($user_id: Int!, $data: String!){
    setDailyRecord(user_id: $user_id, data: $data) {
      id
    }
  }
`

const updateUser = gql`
	mutation updateUser($user_id: Int!, $profile_data: String!) {
  	updateUser(user_id:$user_id, profile_data:$profile_data) {
    	id
    	profile_data
	  }
	}
`

module.exports = {
	setDailyRecord,
	updateUser
}