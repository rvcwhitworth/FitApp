import React from 'react'
import { Alert, View, Text, TextInput, StyleSheet, Animated, Button, Picker, Dimensions } from 'react-native'
import { graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';
import WorkoutInput from './WorkoutInput';
import Chat from './chatIcon'
import FooterNav from './FooterNav.js'
import SVG from './SVG/svg5Left.js'
const { width, height } = Dimensions.get('window');


class WorkoutScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'transparent',
      selectedDay: new Date().getDay()
    }
    this.setupWorkoutDisplay = this.setupWorkoutDisplay.bind(this);
    this.updateWorkoutDisplay = this.updateWorkoutDisplay.bind(this);
    this.handleWorkoutSubmission = this.handleWorkoutSubmission.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  setupWorkoutDisplay (workout) {
    Object.keys(workout).forEach((workoutType) => {
      this.state[workoutType] = false;
    });
    this.state.displaySet = true;
  }

  handleWorkoutSubmission () {
    let dataString = JSON.stringify({workout: this.state.workoutData})
    this.props.mutate({
      variables: {
        user_id: 1,
        data: dataString

      }
    })
    .then(({ data }) => Alert.alert('Workout receieved!', 'Data from DB:', data.data))
    .catch((error) => Alert.alert('Error!', error))
  }

  updateWorkoutDisplay (workoutType) {
    this.setState((prevState) => {
      prevState[workoutType] = !prevState[workoutType];
      return prevState;
    })
  }

  render() {
    const { getExercisePlans, loading } = this.props.data;
    if (getExercisePlans && !this.state.dailyWorkout && !this.state.displaySet) {
      this.state.dailyWorkout = JSON.parse(getExercisePlans.slice().pop().regimen)[new Date().getDay()];
      if (this.state.dailyWorkout !== "OFF") {
        this.setupWorkoutDisplay(this.state.dailyWorkout); 
      }
      this.state.displaySet = true;
    }

    return (
      <Animated.View style={[styles.container, { backgroundColor: 'white', flexDirection:'column', width:width, height:height }]}>
        <SVG />
        {loading || !this.state.dailyWorkout || !this.state.displaySet ? (<View><Text>Loading workout data</Text></View>) : (
        <View style={{flex: 1}}>
          <Picker
            selectedValue={this.state.selectedDay}
            onValueChange={this.handleSelectChange}
          >
            <Picker.Item label="Sunday" value={0} />
            <Picker.Item label="Monday" value={1} />
            <Picker.Item label="Tuesday" value={2} />
            <Picker.Item label="Wednesday" value={3} />
            <Picker.Item label="Thursday" value={4} />
            <Picker.Item label="Friday" value={5} />
            <Picker.Item label="Sunday" value={6} />
          </Picker>
          <Text style={styles.header}>
            Your workout:
          </Text>
          {this.state.dailyWorkout !== "OFF" ? Object.keys(this.state.dailyWorkout).map((workoutType, i) => {
            var height = this.state[workoutType] ? 40 : null;
            return (
              <View style={{height, marginTop: 5, marginBottom: 5}} key={i}>
                <Button 
                  title={workoutType + ": " + this.state.dailyWorkout[workoutType].frequency}
                  onPress={() => this.updateWorkoutDisplay(workoutType)}
                />
                <WorkoutInput 
                  workoutInfo={this.state.dailyWorkout[workoutType]}
                  display={this.state[workoutType]}
                  workoutType={workoutType}
                  updateData={this.updateWorkoutDisplay}
                />
              </View>
            );
          }) : <Text>Enjoy your day off!</Text>}

          {this.state.dailyWorkout !== "OFF" &&  
            <Button
              title={'Submit Workout'}
              onPress={this.handleWorkoutSubmission}
            />}
          <Chat nav={this.props.nav}/>
        </View>)}
      <FooterNav nav={this.props.nav} index={0}/>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  //  backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 1
  },

  header : {
    textAlign: 'center',
    fontSize: 28
  },

  list: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
  }
})

const planQuery = gql`
{
  getExercisePlans(id: 1, type: "client") {
    regimen
  }
}`

const planMutation = gql`
mutation {
  setDailyRecord(user_id: $user_id, data: $data) {
    data
  }
}
`

export default compose(graphql(planQuery), graphql(planMutation))(WorkoutScreen);