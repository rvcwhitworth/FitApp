export default function exampleReducer (state={
	auth: null,
	user: 'Bob',
	password: 'NotPassword',
	fetching: false,
	fetched: false,
	error: null,
	goals: [],
	template: [{name: 'Dwight Howard Shoulder Day', description:'A killer shoulder workout that makes Jon Yuen cry Jabroni tears', photo:'https://www.webpagefx.com/blog/images/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png'}],
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
		case 'ADD_TEMPLATE' : {
			return {
				...state,
				template: state.template.concat(action.payload)
			}
		}
		default : {
			return state
		}

	}
}