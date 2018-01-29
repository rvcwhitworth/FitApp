import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Chat from './chatIcon';
import { graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ProgressCircle from './progressCircle'

  const actions = [{
    text: 'Messages',
    icon: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/2000px-Circle-icons-chat.svg.png' },
    name: 'Cool Icon',
    position: 2
  }, {
    text: 'Video Chat',
    icon: {uri: 'http://icons.iconarchive.com/icons/graphicpeel/balloons/512/iChat-Video-icon.png'},
    name: 'Video',
    position: 1
  }, {
    text: 'Dat Good Good',
    icon: {'uri': 'http://pngimg.com/uploads/eggplant/eggplant_PNG2762.png?i=1'},
    name: 'Eggplant',
    position: 3
  }];

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
    console.log('DATA FROM GRAPHQL', this.props);
    return (
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