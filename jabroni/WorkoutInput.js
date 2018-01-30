import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const styles = StyleSheet.create({
  container: {
  //  backgroundColor: 'transparent',
    flex: 1,
  },

  list: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
  }
});

export default class WorkoutInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      
    }
  }

  render () {
    return this.props.display ? 
    (<View style={{margin: 1}}>
      <Text>{this.props.workoutInfo.frequency}</Text>
    </View>) : null;
  }
}

