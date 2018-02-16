import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Chat from '../utilities/chatIcon'
import MacroGraph from '../utilities/textD3'
import NavFooter from './FooterNav.js'
import SVG from '../SVG/svg5Right.js'
import { List, ListItem, Card, Header } from 'react-native-elements'

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
    {"number":  50, "name": 'Protein', 'Foods': ['Fish: 30g', 'Eggs Benedict : 30g', 'Whey Protien : 40g' ]},
    {"number": 30, "name": 'Carbs', 'Foods': ['Pizza: 40g', 'Challa Bread: 25g', 'Pita Bread: 20g']},
    {"number": 20, "name": 'Fats', 'Foods': ['Twinkies: 15g', 'Nuts: 8g', 'Cheese: 10g']}, 
  ]
    return (
    <View style={styles.container}>
    <SVG />
    <View style={{flex: 5.5, backgroundColor: '#FFFCFA',}}>
    <View zIndex={-2}>
    <Header
      centerComponent={{ text: 'Your Body Balance', style: { color: '#fff', fontSize: 20 } }}
      backgroundColor={'#26547C'}
    />
        <MacroGraph
            pieWidth={150}
            pieHeight={150}
            onItemSelected={this.showList}
            width={300}
            height={300}
            data={testData} />
    </View>
                </View>
    <List containerStyle={{flex: 5.7, backgroundColor: '#FFFCFA', marginBottom: -20, zIndex:0}}>
    {testData[this.state.index]['Foods'].map((val, i) =>{
    	return(
      <Card
        key={i}>
        <Text>{val}</Text>
      </Card>
      )
    })}
    </List>

    <NavFooter nav={this.props.nav} index={2}/>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: '#FFFCFA',
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
    backgroundColor: '#FFFCFA',
    opacity: 0.3,
    left: 0,
    top: 0,
    width: width,
    height: height
  }  
})
