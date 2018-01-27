import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chat from './chatIcon'

export default class DataScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
    <View style={styles.container}>
      <Text>Client data screen goes here!</Text>
      <Chat />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})