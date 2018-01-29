import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

class Chat extends React.Component {
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
          <Text> VIDEO CHAT WHATS GOOD??? </Text>
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

export default Chat