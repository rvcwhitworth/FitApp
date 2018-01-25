import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Navigator from './components/navigator'

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text> Hey Jon </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
