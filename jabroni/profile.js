import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Chat from './chatIcon';
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

    nav.onNavigateShouldAllow(() => {
       return true;
    });

    nav.onNavigateDownStartedListener(({interpolation, start, end, isBack, isMain}) => {
      this.setState({color: 'transparent'})
    })

    nav.onNavigateDownCompletedListener(({completed, isBack}) => {
      if(completed) {
        this.setState({color: '#E53935'})
      }
    })

    nav.onNavigateUpStartedListener(({isBack, isMain}) => {
      this.setState({color: 'transparent'})
    })

    nav.onNavigateUpCompletedListener(({completed, isBack}) => {
      if(completed || isBack && !completed) {
        this.setState({color: '#E53935'})
      }
    })

  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30, marginBottom: 50, textAlign:'center', color:'white'}}>PROFILE</Text>
        <Text style={{padding: 5, textAlign:'center'}}>This is your personal profile, display todays workout on this screen</Text>
        <Text style={{padding: 5, textAlign:'center'}}>Swipe left for your diet!</Text>
        <Text style={{padding: 5, textAlign:'center'}}>Swipe right for your daily inputs and progress stuff!</Text>
        <Chat />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
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