import React from 'react';
import { AsyncStorage, View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Chat from '../utilities/chatIcon'
import { withApollo, graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ProgressCircle from '../utilities/progressCircle'
import FooterNav from './FooterNav.js'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const { width, height } = Dimensions.get('window');

class PlanScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      loading: true,
      selectedDay: new Date().getDay(),
      data: {
        workoutData: '',
        dietData: ''
      },
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

  componentWillMount () {
    AsyncStorage.getItem('@FitApp:UserInfo')
    .then((userInfoString) => {
      this.state.user = JSON.parse(userInfoString);

      return Promise.all([
        this.props.client.query({
        query: dietQuery,
        variables: {
          id: this.state.user.id,
          type: this.state.user.type
        }
      })
      .then(({data}) => {
        this.setState(prevState => {
          prevState.data.dietData = JSON.parse(data.getDietPlans[data.getDietPlans.length - 1].diet);
          return prevState;
        }, () => Promise.resolve())
      })
      .catch((err) => console.err('Error retrieving dietQuery', err)),
      this.props.client.query({
        query: workoutQuery,
        variables: {
          id: this.state.user.id,
          type: this.state.user.type
        }
      })
      .then(({data}) => {
        this.setState(prevState => {
          prevState.data.workoutData = JSON.parse(data.getExercisePlans[data.getExercisePlans.length - 1].regimen);
          prevState.loading = false;
          return prevState;
        }, () => Promise.resolve())
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
      selectedDay: new Date(day.timestamp).getDay()
    });
  }

  loadItems (startDate) {
    // setTimeout(() => {
    //   var currentDate = Object.assign({}, startDate);
    //   var items = {};
    //   while(currentDate.day <= 31) {
    //     console.log('l 115 got here!, getDay', startDate, currentDate, new Date(currentDate.year, currentDate.month - 1, currentDate.day).getDay());
    //     items[currentDate.dateString] = 
    //       [
    //         {
    //           workout: this.state.data.workoutData[new Date(currentDate.year, currentDate.month - 1, currentDate.day).getDay()], 
    //           diet: this.state.data.dietData[new Date(currentDate.year, currentDate.month - 1, currentDate.day).getDay()]
    //         }
    //       ]
        
    //     currentDate.day++;
    //     currentDate.dateString = 
    //       currentDate.year + '-' + 
    //       (currentDate.month.toString().length === 1 ? '0' + currentDate.month.toString() : currentDate.month) + '-' + 
    //       (currentDate.day.toString().length === 1 ? '0' + currentDate.day.toString() : currentDate.day);
    //   }
  
    //   this.setState({items}, () => console.log('l 129 got here', this.state.items));
    // }, 1000);

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  }

   timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  isValidDate(startDate, currentDate) {
    console.log('l 135 MADE IT going to return', new Date(currentDate.year, currentDate.month - 1, currentDate.day).getMonth() !== new Date(startDate.timestamp).getMonth())
    return new Date(currentDate.year, currentDate.month - 1, currentDate.day).getMonth() !== new Date(startDate.timestamp).getMonth()
  }

  renderItem ({diet, workout}) {
    // return (
    //   <View style={styles.item}>
    //     <Text>Workout: {JSON.stringify(item.workout)}</Text>
    //     <Text>Diet: {JSON.stringify(item.diet)}</Text>
    //   </View>
    // );

    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate () {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged (r1, r2) {
    return r1.name !== r2.name;
  }

  render(){
    if (this.state.loading) return (<View><Text style={{textAlign: 'center'}}>Loading your data!</Text></View>);
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
      {/* <Calendar 
        onDayPress={this.onDayPress}
        hideExtraDays
        markedDates={{[this.state.selected]: {selected: true}}}
      />
      <View style={styles.container}>
        <Text>Workout: {JSON.stringify(this.state.data.workoutData[this.state.selectedDay])}</Text>
        <Text>Diet: {JSON.stringify(this.state.data.dietData[this.state.selectedDay])}</Text>
      </View> */}
   
      <Agenda 
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
      />

      <Chat nav={this.props.nav} />
      <FooterNav nav={this.props.nav} index={1} /> 
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
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
  query getDietPlans($id: Int!, $type: String!){
    getDietPlans(id: $id, type: $type) {
      diet
      trainer {
        fullName
      }
    }
  }
`

const workoutQuery = gql`
  query getExercisePlans($id: Int!, $type: String!){
    getExercisePlans(id: $id, type: $type) {
      regimen
    }
  }
`

export default withApollo(PlanScreen);