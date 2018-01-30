import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Chat from './chatIcon'
import FooterNav from './FooterNav.js'
import SVG from './SVG/svg5Bottom.js'

const { width, height } = Dimensions.get('window');

class DailyInputs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: '#9575CD',
    }
  }

  componentDidMount() {
    this.props.nav.cleanUp()
    const { nav } = this.props;

    nav.onNavigateShouldAllow(() => {
       return true;
    });

    nav.onNavigateLeftStartedListener(({interpolation, start, end, isBack, isMain}) => {
      this.props.nav.cleanUp()
      console.log('INPUTS')
      console.log('inside LeftStartedListener')
      console.log('interpolation', interpolation)
      console.log('start', start)
      console.log('end', end)
      console.log('isBack', isBack)
      console.log('isMain', isMain)

      if(isBack && !isMain) {
        console.log('what')
      } else if(isBack) {
        console.log('the?')
      }
    })

    nav.onNavigateLeftCompletedListener(({completed, isBack}) => {
      console.log('INPUTS')
      console.log('completed', completed)
      console.log('isBack', isBack)
      if(!completed && isBack) {
        this.setState({color: '#9575CD'})
      }
    })

    nav.onNavigateRightStartedListener(({isBack, isMain}) => {
      console.log('INPUTS')
      console.log('isBack', isBack)
      console.log('isMain', isMain)
      if(!isMain) {
        this.setState({color: 'transparent'})
      }
    })

    nav.onNavigateRightCompletedListener(({completed}) => {
      console.log('INPUTS')
      if(completed) {
        this.setState({color: '#9575CD'})
      }
    })
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
      <View style={{flex:1}}>
      <SVG />
      </View>
        <View style={styles.list}>
          <Text style={{margin: 10, height: 50, paddingLeft: 5, paddingTop: 20}}>This is where our diet for the day would be </Text>
          <Chat nav={this.props.nav}/>
        </View>
        <FooterNav nav={this.props.nav} index={0}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  //  backgroundColor: 'transparent',
    flex: 1,
  },

  list: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
  }
})

export default DailyInputs