import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Chat from '../utilities/chatIcon.js'
const { width, height } = Dimensions.get('window');
import SVG from '../SVG/svg5Left.js'

class Weekly extends React.Component {
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
        <View style={{marginTop: 5, flex:1}}>
          <Text> So this is where we would show lifting data over time ect ect....</Text>
          <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    width: width,
    height: height
  },
})

export default Weekly