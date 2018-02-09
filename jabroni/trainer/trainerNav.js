import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ButtonGroup} from 'react-native-elements';
//THIS IS FOR THE TRAINER
class FooterNav extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selectedIndex: this.props.index
      }
      this.updateIndex = this.updateIndex.bind(this)
    }

    componentWillReceiveProps(nextProps){
      this.setState({selectedIndex: nextProps.index})
    }
    
    updateIndex (selectedIndex) {
      this.props.nav.clearStack()
       const buttons = ['Home', 'Plans', 'Roster']
      if(this.state.selectedIndex !== selectedIndex){
      this.setState({selectedIndex}, () => {
        this.props.nav.navigate(buttons[selectedIndex])
      })
      }
    }
  render() {
    const buttons = ['Home', 'Plans', 'Roster'];

    return (
        <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{height: 50}}
            selectedButtonStyle={{backgroundColor:"#2196F3"}}
            selectedTextStyle={{color:'white'}}
        />
    )

  }
}

export default FooterNav