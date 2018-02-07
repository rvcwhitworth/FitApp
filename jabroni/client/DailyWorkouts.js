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
import firebase from '../utilities/firebase.js'

const database = firebase.database();
const { width, height } = Dimensions.get('window');

class WorkoutScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'white',
      selectedDay: new Date().getDay(),
      workoutData: {},
      loading: true,
      trainer: ''
    }
    this.setupWorkoutData = this.setupWorkoutData.bind(this);
    this.updateWorkoutDisplay = this.updateWorkoutDisplay.bind(this);
    this.handleWorkoutSubmission = this.handleWorkoutSubmission.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount () {
    AsyncStorage.getItem('@FitApp:UserInfo')
    .then((userInfoString) => {
      this.state.user = JSON.parse(userInfoString);
      // console.log('USER IN STATE', this.state.user);
      this.props.client.query({
        query: planQuery,
        variables: {
          id: this.state.user.id
        }
      })
      .then(({data}) => {
        // console.log('DATA IN DID MOUNT', data)
        this.setState({data, loading: false}, ()=>{

          this.props.client.query({
            query: getSpotters,
            variables: {
              id: this.state.user.id
            }
          })
          .then(({data}) => {
            this.setState({trainer: data.getSpotters[0].trainer.id})
            // this.setState({data, loading: false})
          })


        })
      })
    })
    .catch((err) => console.error('Error retrieving user info from storage!', err));
    

  }

  handleInputChange (newData, workoutType, dataField) {
    this.setState((prevState) => {
      prevState.workoutData[workoutType][dataField] = newData;
      return prevState;
    });
  }

  setupWorkoutData (workout) {
    // console.log('HERE WITH', workout);
    var workoutData = {};
    Object.keys(workout).forEach((workoutType) => {
      workoutData[workoutType] = {
        weight: '',
        frequency: ''
      };
    });
    this.setState({workoutData})
  }

  handleWorkoutSubmission () {
    var date = new Date().toDateString()
    database.ref('UserData/' + this.state.trainer)
    .push({date: date, order: new Date().valueOf(), user: this.state.user.fullName, workout: this.state.workoutData});
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

    const { getExercisePlans } = this.state.data;
    // console.log('l123 GOT HERE WITH', getExercisePlans)
    if (getExercisePlans && !this.state.dailyWorkout && !this.state.displaySet) {
      this.state.regimen = JSON.parse(getExercisePlans.slice().pop().regimen);
      this.state.dailyWorkout = this.state.regimen[this.state.selectedDay];
      if (this.state.dailyWorkout !== "OFF") {
        this.setupWorkoutData(this.state.dailyWorkout); 
      }
      this.state.displaySet = true;
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
            <Picker.Item label="Saturday" value={6} />
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
          <Chat nav={this.props.nav} TopNav={this.props.topNav}/>

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

const planQuery = gql`
query getExercisePlans($id: Int!){
  getExercisePlans(id: $id, type: "client") {
    regimen
  }
}`

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

const getSpotters = gql`
query getSpotters($id: Int!){
  getSpotters(id: $id, type: "client") {
    id
    trainer{
      id
    }
  }
}`

export default withApollo(WorkoutScreen);