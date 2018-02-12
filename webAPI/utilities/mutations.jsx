import gql from 'graphql-tag';


const createExercisePlan = gql`
    mutation setExercisePlan($name: String!, $regimen: String!, $trainer_id: Int!, $client_id: Int!){
	setExercisePlan(name: $name, regimen: $regimen, trainer_id: $trainer_id, client_id: $client_id){
		id
	}
}`

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
}
`

module.exports = {
	createExercisePlan,
	addSpotter
}