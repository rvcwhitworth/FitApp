import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Chat from '../utilities/chatIcon.js'
import Graph from './bodyCompGraph.js'
import FooterNav from './FooterNav.js'
const { width, height } = Dimensions.get('window');
import SVG from '../SVG/svg5Bottom.js'

class BodyComposition extends React.Component {
  componentDidMount() {
    const { nav } = this.props;

    // nav.onNavigateShouldAllow(() => {
    //    return true;
    // });

  }

  render() {
    return (
      <View style={styles.container}>
      <SVG />
      <View style={{flex: 1, alignSelf: 'center'}}>
        <Graph />
      <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
      </View>
        <FooterNav nav={this.props.nav} index={2}/>
       
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width:width, 
    height:height
  },
})

export default BodyComposition