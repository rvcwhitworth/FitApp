import gql from 'graphql-tag';

module.exports.submitDailyInput = gql`
	mutation setDailyRecord($user_id: Int!, $data: String!){
    setDailyRecord(user_id: $user_id, data: $data) {
      id
    }
  }
`

