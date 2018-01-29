import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ButtonGroup} from 'react-native-elements';
import { Constants } from 'expo';
class landingScreen extends React.Component {
  constructor(props) {
    super()
  }
  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <Button title="sign up" onPress={() => {
          navigate('signUp');
        }}/>

        <Button title="log in" onPress={() => {
          navigate('logIn');
        }}/>
        <ImageBackground source={require('./fire.jpeg')}
          style={styles.backgroundImage}>

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
