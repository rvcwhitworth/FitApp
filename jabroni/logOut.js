import React from 'react'
import { StyleSheet, Text, View, Button, Animated } from 'react-native';
import SVG from './SVG/svg5Top.js'

class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const { nav } = this.props;

    // nav.onNavigateShouldAllow(() => {
    //    return true;
    // });

    // nav.onNavigateDownStartedListener(({interpolation, start, end, isBack, isMain}) => {
    //   this.setState({color: 'transparent'})
    // })

    // nav.onNavigateDownCompletedListener(({completed, isBack}) => {
    //   if(completed) {
    //     this.setState({color: '#E53935'})
    //   }
    // })

    // nav.onNavigateUpStartedListener(({isBack, isMain}) => {
    //   this.setState({color: 'transparent'})
    // })

    // nav.onNavigateUpCompletedListener(({completed, isBack}) => {
    //   if(completed || isBack && !completed) {
    //     this.setState({color: '#E53935'})
    //   }
    // })

  }
  
  render(){
    return (
    <View style={styles.container} >
    <View>
    <SVG />
    </View>
      <Button title="Switch to Trainer Profile" onPress={() => {
      console.log('hi1')
      }} />
      <Button title="Logout" style={styles.button} onPress={() => {
       console.log("hi2")
      }} />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    backgroundColor: 'black',
    opacity: 0.7,
    flex: 1,
  },
  button: {
    padding: 20,
    backgroundColor: 'black'
  }
})

export default LogOut