import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Chat from './chatIcon.js'

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
        <View style={{marginTop: 50}}>
          <Text> This will be our body composition graph wooohoooo!! </Text>
        </View>
        <Chat />
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