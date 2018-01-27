import React from 'react'
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native'
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

class DietScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'transparent',
    }
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
      <Animated.View style={[styles.container, { backgroundColor: this.state.color }]}>
        <View style={styles.list}>
          <Text style={{margin: 10, height: 50, paddingLeft: 5, paddingTop: 20}}>This is where our diet for the day would be </Text>
        </View>
      </Animated.View>
    )

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

export default DietScreen