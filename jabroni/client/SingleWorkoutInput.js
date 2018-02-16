import React from 'react';
import {
  View,
  Picker,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';

export default class SingleWorkoutInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedSet: 0
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange (selectedSet) {
    this.setState({ selectedSet, reps: '', weight: '' });
  }

  render () {
    return (
      <View style={{flex: 1, marginBottom: 5, width: Dimensions.width - '10%', alignContent: 'flex-start', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          {this.props.workoutName}
        </Text>
        <View style={{flex: 1, flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-between'}}>
          <Picker
            selectedValue={this.state.selectedSet}
            onValueChange={this.handleSelectChange}
            key={this.props.workoutName + 'Picker'}
            style={{width: 110}}
          >
            {this.props.reps.map((rep, i) => <Picker.Item label={'Set ' + (i + 1)} value={i} key={this.props.workoutName + +'PickerItem' + i}/>)}
          </Picker>
          <TextInput 
            placeholder={'Target Weight: ' + this.props.weights[this.state.selectedSet]}
            value={this.state.weightTotal || ''}
            onChangeText={(weightTotal) => this.setState({ weightTotal })}
            style={{height: 50, width: 120}}
          />
          <TextInput
            placeholder={'Target Reps: ' + this.props.reps[this.state.selectedSet]}
            value={this.state.repCount || ''}
            onChangeText={(repCount) => this.setState({ repCount })}
            style={{height: 50, width: 100}}
          />
        </View>
      </View>
    );
  }
};