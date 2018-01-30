import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import FooterNav from './FooterNav.js'

export default class TeamScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
  	const { width, height } = Dimensions.get('window');

    return (
    <View style={{flexDirection: 'column', width:width, height:height, backgroundColor: 'white'}}>
    <View style={{flex:1}}>
      <Text>Client team screen goes here!</Text>
    </View>
      <FooterNav nav={this.props.nav} index={3} />
    </View>);
  }
}

