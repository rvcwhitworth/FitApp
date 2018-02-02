const authUser = (text) => ({
	type: 'AUTH_BYPASS',
	payload : text
});

export default authUser