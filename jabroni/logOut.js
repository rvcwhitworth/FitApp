import React from 'react'
import { StyleSheet, Text, View, Button, Animated, AsyncStorage } from 'react-native';

class LogOut extends React.Component{
  constructor(props) {
    super(props);
    this.getOut = this.getOut.bind(this)
  }

  componentDidMount() {
    console.log('am i a genius???', this.props)
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

  getOut(){
    AsyncStorage.clear((err) => { if(err) console.log(err) })
    console.log('WE CLEARED IT', this.props)
    this.props.topNav.navigation.navigate('landing')
  }
  
  render(){
    return (
    <View style={styles.container} >
    <View>
    </View>
      <Button title="Switch to Trainer Profile" onPress={() => {
      this.props.topNav.navigation.navigate('TrainerHome')
      }} />
      <Button title="Logout" style={styles.button} onPress={this.getOut} />
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