export default function exampleReducer (state={
	auth: null,
	user: 'Bob',
	password: 'NotPassword',
	fetching: false,
	fetched: false,
	error: null,
	goals: [],
	backgroundImg: 'https://www.webpagefx.com/blog/images/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png',
	profileImg: 'https://www.webpagefx.com/blog/images/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png'
}, action){
	console.log('action.type', action.type)

	switch (action.type) {
		case 'BRANDING_BACKGROUND' : {
			return {
				...state,
				backgroundImg: action.payload

			}
		}
		case 'PROFILE_PIC' : {
			return {
				...state,
				profileImg: action.payload
			}
		}
		case 'FETCH_EXAMPLE_FULFILLED' : {
			return {
				error: state.error,
				fetching: false,
				fetched: true,
				foo: action.payload
			}
		}
		default : {
			return state
		}

	}
}