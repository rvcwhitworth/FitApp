import React from 'react'
import { 
  AsyncStorage, 
  Alert, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Animated, 
  Button, 
  Picker, 
  Dimensions 
} from 'react-native'
import { withApollo, graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Chat from '../utilities/chatIcon'
import FooterNav from './FooterNav.js'
import SVG from '../SVG/svg5Left.js'
import { exercisePlans, user } from '../utilities/dataStore.js';
const { width, height } = Dimensions.get('window');

class WorkoutScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: user,
      color: 'white',
      selectedDay: new Date().getDay(),
      loading: true,
      data: exercisePlans
    }

    this.state.regimen = JSON.parse(this.state.data.slice().pop().regimen);
    this.state.dailyWorkout =this.state.regimen[this.state.selectedDay];
    this.setupWorkoutData = this.setupWorkoutData.bind(this);
    this.updateWorkoutDisplay = this.updateWorkoutDisplay.bind(this);
    this.handleWorkoutSubmission = this.handleWorkoutSubmission.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount () {
    if (this.state.dailyWorkout !== "OFF") {
      this.setupWorkoutData(this.state.dailyWorkout, () => this.setState({loading: false})); 
    }
  }

  handleInputChange (newData, workoutType, dataField) {
    this.setState((prevState) => {
      prevState.workoutData[workoutType][dataField] = newData;
      return prevState;
    });
  }

  setupWorkoutData (workout, cb) {
    var workoutData = {};
    Object.keys(workout).forEach((workoutType) => {
      workoutData[workoutType] = {
        weight: '',
        frequency: ''
      };
    });
    this.setState({workoutData}, cb)
  }

  handleWorkoutSubmission () {
    let dataString = JSON.stringify({workout: this.state.workoutData})
    this.props.client.mutate({
      mutation: planMutation,
      variables: {
        user_id: this.state.user.id,
        data: dataString
      }
    })
    .then(({data}) => {
      Alert.alert('Workout receieved!', 'Great work today, keep it up!')
    })
    .catch((error) => {
      Alert.alert('Error!', 'Error logged to console.')
      console.error('err posting workout', error);
    })
  }

  updateWorkoutDisplay (workoutType) {
    this.setState((prevState) => {
      prevState[workoutType] = !prevState[workoutType];
      return prevState;
    })
  }

  handleSelectChange (selectedDay) {
    this.setState({selectedDay, dailyWorkout: this.state.regimen[selectedDay], workoutData: {}}, 
    () => { if (this.state.dailyWorkout !== 'OFF') this.setupWorkoutData(this.state.dailyWorkout)});
  }

  render() {
    if (this.state.loading) {
      return (
      <Animated.View style={[styles.container, { backgroundColor: 'white', flexDirection:'column', width:width, height:height }]}>
        <View style={{flex: 1}}>
          <SVG />
        </View>
      </Animated.View>)
    }

    return (
      <Animated.View style={[styles.container, { backgroundColor: 'white', flexDirection:'column', width:width, height:height }]}>
        <View style={{flex: 1}}>
          <SVG />
        </View>
        {!this.state.dailyWorkout || !this.state.displaySet ? (<View><Text>Loading workout data</Text></View>) : (
        <View style={{flex: 9, alignItems: 'center'}}>
          <Text style={styles.header}>
            Your Daily Workout
          </Text>

          <Picker
            selectedValue={this.state.selectedDay}
            onValueChange={this.handleSelectChange}
            itemStyle={{textAlign: 'center'}}
            style={{width: 150}}
          >
            <Picker.Item label="Sunday" value={0} />
            <Picker.Item label="Monday" value={1} />
            <Picker.Item label="Tuesday" value={2} />
            <Picker.Item label="Wednesday" value={3} />
            <Picker.Item label="Thursday" value={4} />
            <Picker.Item label="Friday" value={5} />
            <Picker.Item label="Sunday" value={6} />
          </Picker>

          {this.state.dailyWorkout !== "OFF" ? Object.keys(this.state.dailyWorkout).map((workoutType, i) => {
            return (
              <View style={{flex: 1, marginBottom: 5}} key={i}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>
                  {workoutType + ": " + this.state.dailyWorkout[workoutType].frequency}
                </Text>
                <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
                  <TextInput 
                    placeholder={'Weight'}
                    value={this.state.workoutData[workoutType] ? this.state.workoutData[workoutType].weight : ''}
                    onChangeText={((weight) => this.handleInputChange(weight, workoutType, 'weight'))}
                    style={{height: 50, width: 100}}
                  />
                  <TextInput
                    placeholder={'Sets X Reps'}
                    value={this.state.workoutData[workoutType] ? this.state.workoutData[workoutType].frequency : ''}
                    onChangeText={((frequency) => this.handleInputChange(frequency, workoutType, 'frequency'))}
                    style={{height: 50, width: 100}}
                  />
                </View>
              </View>
            );
          }) : 
            <Text 
              style={{textAlign: 'center', fontSize: 20}}
            >
              Enjoy your day off!
            </Text>}
          

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
    backgroundColor: "#fff"
  },

  header : {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  },

  list: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
  }
})

const planMutation = gql`
mutation setDailyRecord($user_id: Int!, $data: String!) {
  setDailyRecord(
    user_id: $user_id,
    data: $data
  ) {
    data
  }
}
`

export default withApollo(WorkoutScreen);