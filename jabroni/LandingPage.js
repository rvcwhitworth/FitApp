import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ButtonGroup} from 'react-native-elements';

class landingScreen extends React.Component {
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

  render(){
    const { navigate } = this.props.navigation;
    const buttons = ['Home', 'Plan', 'Data', 'Team']

    return (
      <View style={{flex: 1}}>
        <ImageBackground source={require('../images/fire.jpeg')}
          style={styles.backgroundImage}>
          <View style={{flex: 1, marginTop: 120}}>
            <Button title="sign up" onPress={() => {
              navigate('signUp');
            }}/> 
            <View style={{margin: 10}}/>

            <Button title="Client log in" onPress={() => {
              navigate('ClientLogIn');
            }}/>
            <View style={{margin: 10}}/> 

            <Button title="Trainer log in" onPress={() => {
              navigate('TrainerLogIn');
            }}/>
            <View style={{margin: 10}}/> 

            <Button title="bypass" onPress={() => navigate('clientHome')}/>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default landingScreen;


    // <View>
      // <Button title="sign up" onPress={() => {
      //   navigate('signUp');
      // }}/>

      

      // <Button title="log in" onPress={() => {
      //   navigate('logIn');
      // }}/>
    //   <Text style={{"color": "red", "fontWeight": "bold", "fontSize": 32}}>Fitness App</Text>
    // </View>
