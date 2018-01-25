import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './jabroni/navigator'
import * as firebase from 'firebase';
import TOKENS from './TOKENS.js';

const firebaseConfig = {
  apiKey: TOKENS.firebaseConfig.apiKey,
  authDomain: TOKENS.firebaseConfig.authDomain,
  databaseURL: TOKENS.firebaseConfig.databaseURL,
  projectId: TOKENS.firebaseConfig.projectId,
  storageBucket: TOKENS.firebaseConfig.storageBucket,
  messagingSenderId: TOKENS.firebaseConfig.messagingSenderId,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App
// 