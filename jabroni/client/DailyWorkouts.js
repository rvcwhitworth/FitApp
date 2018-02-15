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
import _ from 'underscore';

const database = firebase.database();
const { width, height } = Dimensions.get('window');
const days = ['sunday','tuesday','wednesday','thursday','friday','saturday'];
const unwantedFields = ['name', 'description', 'photo'];

class WorkoutScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'white',
      selectedDay: days[new Date().getDay()],
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

        // pull regimen and daily workout from workout plan
        let regimen = JSON.parse(data.getExercisePlans.slice().pop().regimen).regimen;
        let dailyWorkout = regimen[this.state.selectedDay];

        if (!dailyWorkout.includes(null)) {
          this.setupWorkoutData(dailyWorkout); 
        }
        console.log('dailyWorkout', dailyWorkout)
        this.setState({data, regimen, dailyWorkout}, ()=>{

          this.props.client.query({
            query: getSpotters,
            variables: {
              id: this.state.user.id
            }
          })
          .then(({data}) => {
            this.setState({
              trainer: data.getSpotters[0].trainer.id,
              loading: false,
              displaySet: true
            })
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
    var workoutData = {};
    console.log('HERE WITH', workout)
    Object.keys(workout[0].regimen).forEach((workoutType) => {
      if (!unwantedFields.includes(workoutType)) {
        workoutData[workoutType] = {
          weight: {},
          frequency: {}
        };
      }
    });
    this.setState({workoutData, displaySet: true})
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
      if (prevState.loading) {
        prevState.loading = !prevState.loading;
      }
      return prevState;
    })
  }

  handleSelectChange (selectedDay) {
    console.log('SELECTED DAY AND REGIMEN', selectedDay, this.state.regimen);
    this.setState({selectedDay, dailyWorkout: this.state.regimen[selectedDay], workoutData: {}}, 
    () => { console.log('THIS IS THE NEW DAILYWORKOUT', this.state.dailyWorkout);if (!this.state.dailyWorkout.includes(null)) this.setupWorkoutData(this.state.dailyWorkout)});
  }

  render() {
    if (this.state.loading) {
      return (
      <Animated.View style={[styles.container, { backgroundColor: 'white', flexDirection:'column', width:width, height:height }]}>
        <View style={{flex: 1}}>
          <SVG />
        </View>
        <Text>Loading workout data</Text>
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
            key={'dayPicker'}
          >
            <Picker.Item label="Sunday" value={'sunday'} />
            <Picker.Item label="Monday" value={'monday'} />
            <Picker.Item label="Tuesday" value={'tuesday'} />
            <Picker.Item label="Wednesday" value={'wednesday'} />
            <Picker.Item label="Thursday" value={'thursday'} />
            <Picker.Item label="Friday" value={'friday'} />
            <Picker.Item label="Saturday" value={'saturday'} />
          </Picker>


          {!this.state.dailyWorkout.includes(null) && <Text style={{fontSize: 24, textAlign: 'center'}}>{this.state.dailyWorkout[0].regimen.name}</Text>}
          {!this.state.dailyWorkout.includes(null) ? Object.keys(this.state.dailyWorkout[0].regimen).map((workoutType, i) => {
            if (unwantedFields.includes(workoutType)) return null;

            let workoutName = workoutType === '' ? 'Unnamed' : workoutType;
            let workout = this.state.dailyWorkout[0].regimen[workoutType];
            let reps = Object.values(_.pick(workout, (value, key) => key.includes('Reps')));
            let weights = Object.values(_.pick(workout, (value, key) => key.includes('Weight')));
            let selectedSet = 0;
            const changeSelected = (newSet) => selectedSet = newSet;

            return (
              <View style={{flex: 1, marginBottom: 5}} key={workoutName + 'View'}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>
                  {workoutName}
                </Text>
                <View style={{flex: 1, flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-between'}}>
                  <Picker
                    selectedValue={selectedSet}
                    onValueChange={changeSelected}
                    key={workoutName + 'Picker'}
                    style={{width: 60}}
                  >
                    {reps.map((rep, i) => <Picker.Item label={'Set ' + (i + 1)} value={i} key={workoutName + i}/>)}
                  </Picker>
                  <TextInput 
                    placeholder={'Target Weight: ' + weights[selectedSet]}
                    value={this.state.workoutData[workoutType] ? this.state.workoutData[workoutType].weight[selectedSet] : ''}
                    onChangeText={((weight) => this.handleInputChange(weight, workoutType, 'weight'))}
                    style={{height: 50, width: 80}}
                  />
                  <TextInput
                    placeholder={'Target Reps: ' + reps[selectedSet]}
                    value={this.state.workoutData[workoutType] ? this.state.workoutData[workoutType].frequency[selectedSet] : ''}
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
          

          {!this.state.dailyWorkout.includes(null) &&  
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