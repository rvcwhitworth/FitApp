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
        <View style={styles.graphContainer}>
          <Graph style={styles.graph} />
          <Chat style={styles.chat} nav={this.props.nav} TopNav={this.props.topNav}/>
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
    justifyContent: 'center',
    width:width, 
    height:height
  },
  graphContainer: {
    flex: 3,
    flexDirection: 'column',
    height: "50%",
    marginBottom: "20%" 
  },
  chat: {
    marginTop: '20%',
    borderWidth: 2,
    borderColor: "green"
  },
  graph: {
    borderWidth: 2,
    borderColor: "red"
  }
})

export default BodyComposition