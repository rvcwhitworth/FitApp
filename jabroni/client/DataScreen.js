import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Chat from '../utilities/chatIcon'
import MacroGraph from '../utilities/textD3'
import NavFooter from './FooterNav.js'
import SVG from '../SVG/svg5Right.js'

const { width, height } = Dimensions.get('window');

export default class DataOverviewScreen extends React.Component {
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
    <ImageBackground style={styles.backgroundImage} blurRadius={2}  source={require('../../images/testbackground.jpg')} >
    <View style={styles.container}>
    <SVG />
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
    <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
    </View>
    <NavFooter nav={this.props.nav} index={2}/>
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
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
    overlay: {
    flex: 5,
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.3,
    left: 0,
    top: 0,
    width: width,
    height: height
  }  
})
