import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, Button, AsyncStorage } from 'react-native'
import Chat from '../utilities/chatIcon'
import Nav from './trainerNav.js'
import VertNav from './rosterClientNav.js'
const { width, height } = Dimensions.get('window');

class TrainerRoster extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      clients: ['Ethan', 'Chris', 'Ryan', 'Jason'],
      selected: false,
      selectedUser: ''
    }
    this.selectClient = this.selectClient.bind(this)
    this.backToRoster = this.backToRoster.bind(this)

  }

  componentDidMount(){
    this.props.nav.onNavigateShouldAllow(() => {
      console.log('whattt is the state.', this.state.selected)
      if(!this.state.selected){
       return false
     } else{
      return true
     }
    });

    // this.props.nav.onNavigateDownShouldAllow(() => {
    //   if(this.state.selected){
    //     console.log('swiping')
    //     return true
    //   } else{
    //     return false
    //   }
    // })
    // this.props.nav.onNavigateLeftShouldAllow(() => {
    //   if(this.state.selected){
    //     console.log('swiping')
    //     return true
    //   } else{
    //     return false
    //   }
    // })
    // this.props.nav.onNavigateRightShouldAllow(() => {
    //   if(this.state.selected){
    //     console.log('swiping')
    //     return true
    //   } else{
    //     return false
    //   }
    // })
    // this.props.nav.onNavigateUpShouldAllow(() => {
    //   if(this.state.selected){
    //     console.log('swiping')
    //     return true
    //   } else{
    //     return false
    //   }
    // })

  }

  selectClient(name){
    var payload = {
      name: name
    }
    AsyncStorage.setItem('@FitApp:SelectedClient', JSON.stringify(payload))
    this.props.nav.navigate('ClientBodyComp')
  }

  backToRoster(){
    this.setState({
      selected:false,
      selectedUser: ''
    })
  }

  render() {
    //Need to query in component did mount or async storage the trainers clientel
    //map through array of those guys and their pictures as thumbnails?
    if(!this.state.selected){
    return (
      <View style={styles.container}>

        <View style={{flex:1, flexDirection:'column'}}>
        {this.state.clients.map((val, key) => {
          return(<View key={key} style={{flex:1, flexDirection:'column'}}>
            <TouchableOpacity onPress={()=>{this.selectClient(val)}}>
            <Image source={require('../../images/muscle.gif')} style={{width:40, height: 40}} />
            <Text> {val} </Text>
            </TouchableOpacity>
            </View>
            )
        })}
          <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
        </View>
        <Nav nav={this.props.nav} index={2}/>
      </View>
    )} else{
      return(
        <View style={styles.container}>
        <View style={{flex:1}}>
        <Text>{this.state.selectedUser}</Text>
        </View>
        <Button title='Go Back' onPress={()=>this.backToRoster()}/>
        <VertNav nav={this.props.nav} />
        </View>
        )
      //render selectedUser with subcomponent
    }

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    width:width, 
    height:height,
    flex:1,
    paddingTop: 40
  },
    button: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10
  }
})

export default TrainerRoster