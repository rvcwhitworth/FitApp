import React from 'react';
import { AsyncStorage, View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Chat from '../utilities/chatIcon'
import { withApollo, graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ProgressCircle from '../utilities/progressCircle'
import FooterNav from './FooterNav.js'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import _ from 'underscore';

const { width, height } = Dimensions.get('window');
const today = new Date();
const days = ['sunday', 'monday', 'tuesday','wednesday','thursday','friday','saturday'];
const unwantedFields = ['name', 'description', 'photo'];

class PlanScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      loading: true,
      selectedDay: days[moment().day()],
      selected: moment().toISOString().split('T')[0],
      data: {},
      items: {}
    }
    
    this.loadItems = this.loadItems.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyDate = this.renderEmptyDate.bind(this);
    this.rowHasChanged = this.rowHasChanged.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
    this.submit = this.submit.bind(this);
    this.inc = this.inc.bind(this)
  }

  inc(){
  	if(this.state.progress < 1){
  		console.log(this.state.progress)
  		this.setState({
  			progress: this.state.progress + 0.1
  		})
  	}
  }

  componentDidMount () {
    AsyncStorage.getItem('@FitApp:UserInfo')
    .then((userInfoString) => {
      this.state.user = JSON.parse(userInfoString);

      return Promise.all([
        this.props.client.query({
        query: dietQuery,
        variables: {
          id: this.state.user.id
        }
      })
      .then(({data}) => {
        return new Promise((resolve) => {
          this.setState(prevState => {
            prevState.data.dietData = JSON.parse(data.getDietPlans[data.getDietPlans.length - 1].diet);
            return prevState;
          }, resolve)
        })
      })
      .catch((err) => console.err('Error retrieving dietQuery', err)),
      this.props.client.query({
        query: workoutQuery,
        variables: {
          id: this.state.user.id
        }
      })
      .then(({data}) => {        
        return new Promise((resolve) => {
          this.setState(prevState => {
            prevState.data.workoutData = JSON.parse(data.getExercisePlans.slice().pop().regimen).regimen;

            console.log('WORKOUT DATA IS NOW', prevState.data.workoutData);
            prevState.loading = false;
            return prevState;
          }, resolve)
        })
      }).catch((err) => console.err('Error retrieving workoutQuery', err))
    ]).catch((err) => console.error('Error resolving both promises!', err))
    })
    .catch((err) => console.error('Error retrieving user info from storage!', err));
  }

  submit(e) {
    e.preventDefault();
    this.props.client.mutate({
      query: m,
      variables: {
        name: "Ethans plan",
        diet: JSON.stringify(diet),
        trainer_id: 1,
        client_id: 1
      }
    }).then(({data}) => {
      console.log('got data back from graphQL: ', data);
    }).catch((error) => {
      console.log('graphQL error: ', error);
    })

  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString,
      selectedDay: days[moment(day.dateString, 'YYYY-MM-DD').day()]
    });
  }

  loadItems (startDate) {
    setTimeout(() => {
      var currentDate = Object.assign({}, startDate);
      var items = {};
      while(currentDate.day <= 31) {
        console.log('l 115 got here!, getDay', startDate, currentDate, new Date(currentDate.year, currentDate.month - 1, currentDate.day).getDay());
        items[currentDate.dateString] = 
          [
            {
              workout: this.state.data.workoutData[new Date(currentDate.year, currentDate.month - 1, currentDate.day).getDay()], 
              diet: this.state.data.dietData[new Date(currentDate.year, currentDate.month - 1, currentDate.day).getDay()]
            }
          ]
        
        currentDate.day++;
        currentDate.dateString = 
          currentDate.year + '-' + 
          (currentDate.month.toString().length === 1 ? '0' + currentDate.month.toString() : currentDate.month) + '-' + 
          (currentDate.day.toString().length === 1 ? '0' + currentDate.day.toString() : currentDate.day);
      }
  
      this.state.items = items
    }, 1000);
  }

  isValidDate(startDate, currentDate) {
    console.log('l 135 MADE IT going to return', new Date(currentDate.year, currentDate.month - 1, currentDate.day).getMonth() !== new Date(startDate.timestamp).getMonth())
    return new Date(currentDate.year, currentDate.month - 1, currentDate.day).getMonth() !== new Date(startDate.timestamp).getMonth()
  }

  renderItem ({workout, diet}) {
    return (
      <View style={styles.item}>
        <Text>Workout: {JSON.stringify(workout)}</Text>
        <Text>Diet: {JSON.stringify(diet)}</Text>
          <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
          <View style={styles.container}>
            <Text>
              Your diet:
              {/* {data.getDietPlans[data.getDietPlans.length-1].diet} */}
              Your trainer:
              {/* {data.getDietPlans[data.getDietPlans.length-1].trainer.fullName} */}
            </Text>
            <Button onPress={this.submit} title="submit" />
            <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
          </View>
        </View>
      </View>
    );
  }

  renderEmptyDate () {
    return (
      <View style={styles.emptyDate}><Text>This is an empty date!</Text></View>
    );
  }

  rowHasChanged (r1, r2) {
    return r1.workout !== r2.workout;
  }

  render(){
    if (this.state.loading || !this.state.data.workoutData || !this.state.data.dietData) {
      return (<View><Text style={{textAlign: 'center'}}>Loading your data!</Text></View>);
    }
    var selectedWorkout = this.state.data.workoutData[this.state.selectedDay];
    var selectedDiet = this.state.data.dietData[moment().day()];

    console.log('SELECTED WORKOUT, SELECTED DIET', selectedWorkout, selectedDiet);
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Calendar 
            styles={styles.calendar}
            onDayPress={this.onDayPress}
            hideExtraDays
            markedDates={{[this.state.selected]: {selected: true}}}
          />
          <View style={[styles.container, {justifyContent: 'space-around'}]}>
            <Text style={styles.subHeader}>Workout:</Text>

            {!selectedWorkout.includes(null) && <Text style={{fontSize: 18, textAlign: 'center'}}>{selectedWorkout[0].name}</Text> }
            {selectedWorkout.includes(null) ? <Text style={{fontSize: 14, textAlign: 'center'}}>Off day!</Text> :
              Object.keys(selectedWorkout[0].regimen).map((workout, i) => {
                if (unwantedFields.includes(workout)) return null;
                let sets = Object.values(_.pick(selectedWorkout[0].regimen[workout], (value, key) => key.includes('Reps'))).length;
                return <Text style={{fontSize: 14, textAlign: 'center'}} key={workout+i}>{workout + ': ' + sets + ' sets'}</Text>
              })}
            <Text style={styles.subHeader}>Diet:</Text>
              {Object.keys(selectedDiet).map((diet, i) => {
                return <Text style={{fontSize: 14, textAlign: 'center'}} key={diet+i}>{(diet === 'calories' ? '' : diet + ': ') + selectedDiet[diet] + ' ' + (diet === 'calories' ? 'calories' : 'grams')}</Text>
              })}
          </View>
      
          {/* <Agenda 
            items={this.state.items}
            loadItemsForMonth={this.loadItems}
            renderItem={this.renderItem}
            renderEmptyDate={this.renderEmptyDate}
            rowHasChanged={this.rowHasChanged}
            minDate={today.getFullYear + '-' + today.getMonth + '-' + '01'}
            maxDate={today.getFullYear + '-' + today.getMonth + '-' + '31'}
          /> */}

          <Chat nav={this.props.nav} TopNav={this.props.topNav} />
        </View>
      <FooterNav nav={this.props.nav} index={1} /> 
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 355,
    paddingBottom: 10
  },
  subHeader: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

// in order to pass custom arguments into a mutation, you have to declare the $names of vars
// as well as the types graphQL should expect:

const m = gql`
mutation setDietPlan($name: String!, $diet: String!, $trainer_id: Int!, $client_id: Int!){
  setDietPlan(
    name: $name,
    diet: $diet,
    trainer_id: $trainer_id,
    client_id: $client_id,
  ) {
    id
  }
}`

const dietQuery = gql`
  query getDietPlans($id: Int!) {
    getDietPlans(id: $id, type: "client") {
      diet
      trainer {
        fullName
      }
    }
  }
`

const workoutQuery = gql`
  query getExercisePlans($id: Int!) {
    getExercisePlans(id: $id, type: "client") {
      regimen
    }
  }
`

export default withApollo(PlanScreen);