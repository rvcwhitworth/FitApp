import React from 'react';
import { AsyncStorage, View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Chat from './chatIcon';
import { withApollo, graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ProgressCircle from './progressCircle'
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
      }
    }
    
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

      Promise.all(
        this.props.client.query({
        query: dietQuery,
        variables: {
          id: this.state.user.id,
          type: this.state.user.type
        }
      })
      .then(({data}) => {
        this.setState(prevState => {
          prevState.data.dietData = data;
          return prevState;
        })
      }),
      this.props.client.query({
        query: exerciseQuery,
        variables: {
          id: this.state.user.id,
          type: this.state.user.type
        }
      })
      .then(({data}) => {
        this.setState(prevState => {
          prevState.data.workoutData = data;
          return prevState;
        })
      }))
      .then(() => this.setState({loading: false}))
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

  render(){
    const data = this.state.data;
    if (this.state.loading) return (<View><Text>Loading</Text></View>);
    return (
    <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
      <Calendar 
        onDayPress={this.onDayPress}
        hideExtraDays
        markedDates={{[this.state.selected]: {selected: true}}}
      />
      <View style={styles.container}>
        <Text>{this.state.data.workoutData}</Text>
        <Text>{this.state.data.exerciseData}</Text>
      </View>
    {/* <View style={styles.container}>
      <Text>
        Your diet:
        {data.getDietPlans[data.getDietPlans.length-1].diet}
        Your trainer:
        {data.getDietPlans[data.getDietPlans.length-1].trainer.fullName}
      </Text>
      <Button onPress={this.submit} title="submit" />
    </View>*/}
      <Chat nav={this.props.nav} />
      <FooterNav nav={this.props.nav} index={1} /> 
    </View>
    )
  }

}

const diet = {
  0: {'calories': 2200, 'carbs': 20, 'protein': 80}, 
  1: {'carbs': 25, 'protein': 75}, 
  2: {'carbs': 30, 'protein': 70}, 
  3: {'carbs': 35, 'protein': 65}, 
  4: {'carbs': 40, 'protein': 60}, 
  5: {'carbs': 45, 'protein': 55}, 
  6: {'carbs': 50, 'protein': 50}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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