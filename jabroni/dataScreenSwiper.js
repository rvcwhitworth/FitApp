import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Dimensions,
  Text
} from 'react-native'
import Swiper from 'react-native-swiper'
import MacroGraph from './textD3'
const { width, height } = Dimensions.get('window')

var styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

  const testData = [
    {"number":  50, "name": 'Protein', 'Foods': ['Fish', 'Eggs Benedict', 'Whey Protien' ]},
    {"number": 30, "name": 'Carbs', 'Foods': ['Pizza', 'Challa Bread', 'Pita Bread']},
    {"number": 20, "name": 'Fats', 'Foods': ['Twinkies', 'Nuts', 'Cheese']}, 
  ]

export default class DataScreenSwiper extends Component {
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

  render () {
    return (
      <Swiper style={styles.wrapper}>
  <View style={styles.slide1}>
    <Text style={styles.text}>Hello Swiper</Text>
  </View>
  <View style={styles.slide2}>
    <Text style={styles.text}>Beautiful</Text>
  </View>
  <View style={styles.slide3}>
    <Text style={styles.text}>And simple</Text>
  </View>
</Swiper>
    )
  }
}


    //     <StatusBar barStyle='light-content' />
    //     <Swiper style={styles.wrapper}
    //       dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
    //       activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
    //       paginationStyle={{
    //         bottom: 70
    //       }}
    //       loop={false}>
    //       <View style={styles.slide}>
    // <MacroGraph
    //         pieWidth={150}
    //         pieHeight={150}
    //         onItemSelected={this.showList}
    //         width={300}
    //         height={300}
    //         data={testData} />
    // <Text>
    // {testData[this.state.index]['Foods'].map((val) =>{
    //   return(<Text>{val}</Text>)
    // })}
    // </Text>
    //       </View>
    //       <View style={styles.slide}>
    //       <Text> Hiya page 2 </Text>
    //       </View>
    //       <View style={styles.slide}>
    //       <Text> Hiya page 3 </Text>
    //       </View>
    //     </Swiper>