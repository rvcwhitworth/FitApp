import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import landingScreen from './jabroni/LandingPage';
import logInScreen from './jabroni/LogIn';
import signUpScreen from './jabroni/SignUp';
import clientHome from './jabroni/ClientHome';
import { StackNavigator } from 'react-navigation';
// import * as firebase from 'firebase';
// import TOKENS from './TOKENS.js';

// const firebaseConfig = {
//   apiKey: TOKENS.firebaseConfig.apiKey,
//   authDomain: TOKENS.firebaseConfig.authDomain,
//   databaseURL: TOKENS.firebaseConfig.databaseURL,
//   projectId: TOKENS.firebaseConfig.projectId,
//   storageBucket: TOKENS.firebaseConfig.storageBucket,
//   messagingSenderId: TOKENS.firebaseConfig.messagingSenderId,
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);

class Home extends React.Component {
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

export default Home
// 