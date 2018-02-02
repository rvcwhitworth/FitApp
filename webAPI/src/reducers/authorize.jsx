export default function authReducer (state={
	auth: null,
	user: 'Bob',
	password: 'NotPassword',
	fetching: false,
	fetched: false,
	error: null,
	goals: []
}, action){
	console.log('whats the action', action)

	switch (action.type) {
		case 'AUTH_USER' : {
			return {
				user: action.payload.username,
				password: action.payload.password,
				auth: action.payload.id,
				type: action.payload.type,
				fetching: true,
				fetched: state.fetched,
				error: state.error,
				goals: JSON.parse(action.payload.goals)
			}
		}

		case 'AUTH_BYPASS' : {
			return {
				user: action.payload.ClientUsername || action.payload.TrainerUsername,
				password: action.payload.ClientPassword || action.payload.TrainerPassword,
				auth: state.auth,
				type: action.payload.type,
				fetching: true,
				fetched: state.fetched,
				error: state.error,
				goals: state.goals
			}
		}
		case 'AUTH_LOGOUT' : {
			console.log('are we loging out??')
			return {
				user: null,
				password: null,
				auth: null,
				fetching: true,
				type: null,
				fetched: state.fetched,
				error: state.error,
				goals: null
			}
		}
		case 'AUTH_USER_REJECTED' : {
			return {
				auth: null,
	            user: state.user,
	            password: 'NotPassword',
	            fetching: false,
	            fetched: false,
				error: action.payload
			}
		}
		case 'GOALS_SUBMIT' : {
			return {
				auth: state.auth,
				user: state.user,
				password: state.password,
				fetching: state.fetching,
				fethced: state.fetched,
				error: null,
				goals: action.payload
			}
		}
		default : {
			console.log('defaulting')
			return state
		}

	}
}