import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Navigator from './navigator';

class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View>
        <Navigator />
      </View>
    )
  }
}

HomeScreen.router = Navigator.router;

export default HomeScreen;
