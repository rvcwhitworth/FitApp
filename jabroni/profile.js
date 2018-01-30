import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native'
import Chat from './chatIcon'
import FooterNav from './FooterNav.js'



  // async componentDidMount() {
  //   await AsyncStorage.setItem('key' : 'I like to save it.')
  //   //JSON stringify the data into storage and JSON parse it out, THIS IS SO AMAZING
  // }


class Profile extends React.Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    const { nav } = this.props;

    nav.onNavigateShouldAllow(() => {
       return true;
    });

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

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    return (
      <View style={styles.container}>    
        <View style={{flex: 1}}>
          <Text style={{fontSize: 30, marginBottom: 50, textAlign:'center', color:'white'}}>PROFILE</Text>
          <Button title="Data" onPress={()=> this.props.nav.navigate('Data')} />
          <Text style={{padding: 5, textAlign:'center'}}>Swipe left for your diet!</Text>
          <Text style={{padding: 5, textAlign:'center'}}>Swipe right for your daily inputs and progress stuff!</Text>
        </View>
        <FooterNav nav={this.props.nav} index={0}/>
         <Chat />
      </View>
    );

  }
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: width,
    height: height,
    backgroundColor: 'white'
  },

  nav: {
    position: 'absolute',
    bottom:0,
  },

  button: {
    padding: 10,
    backgroundColor: 'blue',
    marginBottom: 15,
  }
})

export default Profile