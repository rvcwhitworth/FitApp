import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Chat from './chatIcon'
import MacroGraph from './textD3'

export default class DataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	index: 0
    }
    this.showList = this.showList.bind(this)
  }

  showList(foo){
  	this.setState({
  		index: foo
  	})
  }
  
  render(){

  	const testData = [
    {"number":  50, "name": 'Protein', 'Foods': ['Fish', 'Eggs Benedict', 'Whey Protien' ]},
    {"number": 30, "name": 'Carbs', 'Foods': ['Pizza', 'Challa Bread', 'Pita Bread']},
    {"number": 20, "name": 'Fats', 'Foods': ['Twinkies', 'Nuts', 'Cheese']}, 
  ]
    return (
    
    
    <ImageBackground

      style={styles.backgroundImage}
      source={require('../images/weights3.png')} >
    <View style={styles.container}>
    <MacroGraph
            pieWidth={150}
            pieHeight={150}
            onItemSelected={this.showList}
            width={300}
            height={300}
            data={testData} />
    <Text>
    {testData[this.state.index]['Foods'].map((val) =>{
    	return(<Text>{val}</Text>)
    })}
    </Text>
    <Chat />
    </View>
    </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   backgroundImage: {
    flex: 1,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
    overlay: {
    flex: 5,
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 1000
  }  
})