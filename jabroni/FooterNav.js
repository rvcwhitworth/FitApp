import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ButtonGroup} from 'react-native-elements';

class FooterNav extends React.Component {
    constructor(props) {
      super()
      this.state = {
        selectedIndex: 2
      }
      this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
    }
  render() {
    const buttons = ['Home', 'Plan', 'Data', 'Team'];

    return (
      // <View style={{}}>

      <View style={styles.container}>
        <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{height: 50}}
            selectedButtonStyle={{backgroundColor:"#2196F3"}}
            selectedTextStyle={{color:'white'}}
        />
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flex: 1,
    bottom: 0
  },
})

export default FooterNav