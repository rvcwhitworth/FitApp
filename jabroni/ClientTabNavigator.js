import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from './ClientHome'
import PlanScreen from './PlanScreen';
import DataScreen from './DataScreen';
import TeamScreen from './TeamScreen';

const clientTabNavigator = TabNavigator({
  Home: {
    screen: HomeScreen,
    title: 'Home'
  }, 

  Plan: {
    screen: PlanScreen,
    title: 'Plan'
  },

  Data: {
    screen: DataScreen,
    title: 'Data'
  },

  Team: {
    screen: TeamScreen,
    title: 'Team'
  }
});

clientTabNavigator.router = HomeScreen.router;
export default clientTabNavigator;