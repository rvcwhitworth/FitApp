import gql from 'graphql-tag';

const searchQuery = gql`
  query getUsersByFullName($fullName: String!){
    getUsersByFullName(fullName: $fullName) {
      id
      fullName
      email
      profile_data
      username
      connection_requests
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

module.exports = {
	searchQuery,
  spotterQuery
}