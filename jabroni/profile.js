import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

  // async componentDidMount() {
  //   await AsyncStorage.setItem('key' : 'I like to save it.')
  //   //JSON stringify the data into storage and JSON parse it out, THIS IS SO AMAZING
  // }


class Camera extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { nav } = this.props;
    console.log('props', this.props)
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    const { nav } = this.props

    return (
      <View style={styles.container}>
        <View >
          <Text style={{fontSize: 30, marginBottom: 50, textAlign:'center'}}>PROFILE</Text>
          <Text style={{padding: 5, textAlign:'center'}}>This is your personal profile, display todays workout on this screen</Text>
          <Text style={{padding: 5, textAlign:'center'}}>Swipe left for your diet!</Text>
          <Text style={{padding: 5, textAlign:'center'}}>Swipe right for your daily inputs and progress stuff!</Text>

        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    flexDirection: 'column',
  },

  button: {
    padding: 10,
    backgroundColor: 'blue',
    marginBottom: 15,
  }
})

export default Camera