import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, Dimensions, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ButtonGroup} from 'react-native-elements';
//THIS IS FOR THE TRAINER
const { width, height } = Dimensions.get('window');
class VerticalNav extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selectedIndex: this.props.index
      }
      this.updateIndex = this.updateIndex.bind(this)
      this.goBack = this.goBack.bind(this)
    }

    componentWillReceiveProps(nextProps){
      this.setState({selectedIndex: nextProps.index})
    }

    updateIndex (selectedIndex) {
      // this.props.nav.clearStack()
       const buttons = ['Body Composition', 'Diet', 'Workout', 'Plan']
      if(this.state.selectedIndex !== selectedIndex){
      this.setState({selectedIndex}, () => {
        if(buttons[this.state.selectedIndex] === 'Body Composition'){
          this.props.nav.navigate('ClientBodyComp')
        }
        else{
          this.props.nav.navigate('Client'+buttons[this.state.selectedIndex])
        }
        })

      }
      }

    async goBack(){
      this.props.nav.clearStack()
       AsyncStorage.removeItem('@FitApp:SelectedClient')
       this.props.reset()
      this.props.nav.navigate('Roster')
    }
  render() {
    const buttons = ['Body Comp', 'Diet', 'Workout', 'Plan']

    return (
      <View>
      <Button title='Back To Roster' onPress={()=>this.goBack()} />
        <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{height: 70, width: width, right:0}}
            selectedButtonStyle={{backgroundColor:"#2196F3"}}
            selectedTextStyle={{color:'white', textAlign:'right'}}
        />
      </View> 
    )
  }
}

export default VerticalNav