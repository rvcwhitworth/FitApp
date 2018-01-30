import React from 'react'
import { Alert, View, Text, TextInput, StyleSheet, Animated, Button } from 'react-native'
import { graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';
import WorkoutInput from './WorkoutInput';

class DailyWorkoutScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'transparent'
    }

    this.setupWorkoutDisplay = this.setupWorkoutDisplay.bind(this);
    this.updateWorkoutDisplay = this.updateWorkoutDisplay.bind(this);
    this.handleWorkoutSubmission = this.handleWorkoutSubmission.bind(this);
  }

  componentDidMount() {
    const { nav } = this.props;

    nav.onNavigateShouldAllow(() => {
       return true;
    });

    nav.onNavigateDownStartedListener(({interpolation, start, end, isBack, isMain}) => {
      this.setState({color: 'transparent'})
    })

    nav.onNavigateDownCompletedListener(({completed, isBack}) => {
      if(completed) {
        this.setState({color: '#E53935'})
      }
    })

    nav.onNavigateUpStartedListener(({isBack, isMain}) => {
      this.setState({color: 'transparent'})
    })

    nav.onNavigateUpCompletedListener(({completed, isBack}) => {
      if(completed || isBack && !completed) {
        this.setState({color: '#E53935'})
      }
    })

  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
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
      this.setupWorkoutDisplay(this.state.dailyWorkout);
    }

    return (
      <Animated.View style={[styles.container, { backgroundColor: this.state.color }]}>
        {loading || !this.state.dailyWorkout || !this.state.displaySet ? (<View><Text>Loading workout data</Text></View>) : (
        <View style={{flex: 1}}>
          <Text style={styles.header}>
            Your workout:
          </Text>
          {Object.keys(this.state.dailyWorkout).map((workoutType, i) => {
            var height = this.state[workoutType] ? 40 : null
            console.log(height, workoutType)
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
          })}

          <Button
            title={'Submit Workout'}
            onPress={this.handleWorkoutSubmission}
          />
          {/* <Chat /> */}
        </View>)}
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



export default compose(graphql(planQuery), graphql(planMutation))(DailyWorkoutScreen);