import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Chat from './chatIcon.js'
import Test from './daily.js'
import FooterNav from './FooterNav.js'

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
        <Test />
      <View style={{bottom: 0}}>
        <FooterNav nav={this.props.nav} index={2}/>
      </View>   
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})

export default BodyComposition