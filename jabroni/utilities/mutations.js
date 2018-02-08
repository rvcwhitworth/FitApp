import gql from 'graphql-tag';

const setDailyRecord = gql`
	mutation setDailyRecord($user_id: Int!, $data: String!){
    setDailyRecord(user_id: $user_id, data: $data) {
      id
    }
  }
`

module.exports = {
	setDailyRecord
}