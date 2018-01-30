import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Chat from './chatIcon';
import { graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ProgressCircle from './progressCircle'
import FooterNav from './FooterNav.js'

const { width, height } = Dimensions.get('window');

class PlanScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	progress: 0
    }
    this.submit = this.submit.bind(this);
    console.log('plan screen props: ', this.props);
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

  submit(e) {
    e.preventDefault();
    this.props.mutate({
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
  
  render(){
    const data = this.props.data;
    if (this.props.data.loading) return (<View><Text>Loading</Text></View>);
    return (
    <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
    <View style={styles.container}>
      <Text>
        Your diet:
        {data.getDietPlans[data.getDietPlans.length-1].diet}
        Your trainer:
        {data.getDietPlans[data.getDietPlans.length-1].trainer.fullName}
      </Text>
      <Button onPress={this.submit} title="submit" />
      <Chat />
      </View>
      <FooterNav nav={this.props.nav} index={1} />
    </View>
    )
  }

}

const diet = {
  0: {'carbs': 20, 'protein': 80}, 
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

const q = gql`
  query getDietPlans($id: Int!, $type: String!){
    getDietPlans(id: $id, type: $type) {
      diet
      trainer {
        fullName
      }
    }
  }
`

export default compose(graphql(q, {
  options: {
    variables: {
      id: 1,
      type: "client"
    }
  }
}), graphql(m))(PlanScreen);