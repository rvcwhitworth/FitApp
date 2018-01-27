import React from 'react';
import { View, Text } from 'react-native';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

export default class TeamScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
    <View>
      <Text>Client team screen goes here!</Text>
    </View>);
  }
}

