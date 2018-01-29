import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
<<<<<<< HEAD
import Chat from './chatIcon';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import Chat from './chatIcon'
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
  
  render(){
    const data = this.props.data;
    if (this.props.data.loading) return (<View><Text>Loading</Text></View>);
    console.log('DATA FROM GRAPHQL', this.props);
    return (
    <View style={styles.container}>
      <Text>
        Your diet:
        {data.getDietPlans[0].diet}
      </Text>
      <Chat />
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default graphql(gql`
  {
    getDietPlans(id: 1, type: "client") {
      diet
      trainer {
        fullName
      }
    }
  }
`)(PlanScreen);