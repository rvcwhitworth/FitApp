import React from 'react'
import { View, Text, TextInput, StyleSheet, Animated, Dimensions } from 'react-native'
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import SVG from './SVG/svg5Right.js'
import FooterNav from './FooterNav.js'
import Chat from './chatIcon.js'

const { width, height } = Dimensions.get('window');

class DietScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'transparent',
    }
  }

  componentDidMount() {
    this.props.nav.cleanUp('DailyInputs')
    const { nav } = this.props;

    // nav.onNavigateLeftShouldAllow((...args) => {
    //   console.log('can we use this???', ...args)
    //     return true;
    //   });

    nav.onNavigateShouldAllow(() => {
      this.props.nav.cleanUp('DailyInputs')
      this.props.nav.cleanUp('DailyDiet')
       return true;
    });

    nav.onNavigateLeftStartedListener(({interpolation, start, end, isBack, isMain}) => {
      this.props.nav.cleanUp('DailyInputs')
      this.props.nav.cleanUp('DailyDiet')
      console.log('DIET')
      console.log('inside LeftStartedListener')
      console.log('interpolation', interpolation)
      console.log('start', start)
      console.log('end', end)
      console.log('isBack', isBack)
      console.log('isMain', isMain)

      if(isBack) {
        this.props.nav.cleanUp('DailyInputs')
        console.log('CLEANED THIOS UP')
        // nav.navigate('Home')
      } else if(isBack) {
        console.log('the?')
      }
    })

    nav.onNavigateLeftCompletedListener(({completed, isBack}) => {
      this.props.nav.cleanUp()
    })

    nav.onNavigateRightStartedListener(({isBack, isMain}) => {
      console.log('DIET')
      console.log('isBack', isBack)
      console.log('isMain', isMain)
      if(!isMain) {
        this.setState({color: 'transparent'})
      }
    })

    nav.onNavigateRightCompletedListener(({completed}) => {
      console.log('DIET')
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
    )

  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    flex: 2,
  }
})

export default DietScreen