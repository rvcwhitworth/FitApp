import { Camera, Permissions } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'

class Picturetaker extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<View>
			<Button title="see pics" />
		</View>
		);
	}
}

export default Picturetaker;