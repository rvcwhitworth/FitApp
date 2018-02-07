import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Chat from '../utilities/chatIcon'
import Nav from './trainerNav.js'
const { width, height } = Dimensions.get('window');

class TrainerPlans extends React.Component {
  componentDidMount() {
    const { nav } = this.props;

    // nav.onNavigateShouldAllow(() => {
    //    return true;
    // });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
          <Text> This is where we will list his plans **DONT ALLOW CONSTRUCTION** just viewing of each of his plans </Text>
        </View>
        <Nav nav={this.props.nav} index={1}/>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    width:width, 
    height:height
  },
})

export default TrainerPlans