import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Chat from '../utilities/chatIcon.js'
import Graph from './bodyCompGraph.js'
import FooterNav from './FooterNav.js'
import { Header, Icon } from 'react-native-elements'
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
        <Header
          centerComponent={{ text: 'Your Body Composition', style: { color: '#fff', fontSize: 20 } }}
          backgroundColor={'#26547C'}
        />
          <Graph style={styles.graph} />
        </View>
        <FooterNav nav={this.props.nav} index={2}/>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFCFA',
    flexDirection: 'column',
    justifyContent: 'center',
    width:width, 
    height:height,
    zIndex: 1
  },
  graphContainer: {
    flex: 5,
    flexDirection: 'column',
    height: "50%",
    marginBottom: "20%" 
  },
  title: {
    textAlign: 'center'
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