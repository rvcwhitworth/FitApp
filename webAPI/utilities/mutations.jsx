import gql from 'graphql-tag';


const createExercisePlan = gql`
    mutation setExercisePlan($name: String!, $regimen: String!, $trainer_id: Int!, $client_id: Int!){
	setExercisePlan(name: $name, regimen: $regimen, trainer_id: $trainer_id, client_id: $client_id){
		id
	}
}`

module.exports = {
	createExercisePlan
}