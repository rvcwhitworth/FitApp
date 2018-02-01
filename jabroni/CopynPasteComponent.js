import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window');

class Weekly extends React.Component {
  componentDidMount() {
    const { nav } = this.props;

    // nav.onNavigateShouldAllow(() => {
    //    return true;
    // });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 50}}>
          <Text> something something something</Text>
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width,
    height: height,
    flexDirection: 'column'
  },
})

export default Weekly