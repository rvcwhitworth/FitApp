import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, AsyncStorage, ScrollView } from 'react-native'
import { graphql, ApolloProvider, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Divider } from 'react-native-elements'
import firebase from './firebase.js'

// import * as firebase from 'firebase';
// import TOKENS from './../TOKENS.js';
var t = require('tcomb-form-native');
var Form = t.form.Form;

// const firebaseConfig = {
//   apiKey: TOKENS.firebaseConfig.apiKey,
//   authDomain: TOKENS.firebaseConfig.authDomain,
//   databaseURL: TOKENS.firebaseConfig.databaseURL,
//   projectId: TOKENS.firebaseConfig.projectId,
//   storageBucket: TOKENS.firebaseConfig.storageBucket,
//   messagingSenderId: TOKENS.firebaseConfig.messagingSenderId,
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

var database = firebase.database();


class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showRoom : "none",
      showRooms : "flex",
      messages : [],
      rooms: [],
      roomID: '',
      Person: t.struct({
          Message: t.String,
        }),
    }
    this.touch = this.touch.bind(this)
    this.backToRooms = this.backToRooms.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.getId = this.getId.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }
  componentDidMount() {
    const { nav } = this.props;

    // console.log('this ,bdfwhkfwejfkfnjounted roigjht')
    this.props.client.query({
      query: getChatRooms,
      variables: {
        id: 2
      }
  }).then((val) => {
    console.log(val, typeof val)
    this.setState({
      rooms: val.data.getChatRooms
    }, () => this.getId())
  })
}

  getId(){
      AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
      if (err) console.log(err);
      else {
        if(val){
        var obj = JSON.parse(val)
        this.setState({user: obj})
        }
      }
    })
}

  touch(room_id){
    database.ref('/rooms/' + room_id + '/messages').on("value", (snapshot)=>{
      console.log('hey you', snapshot.val())
      this.setState({messages: Object.values(snapshot.val())}, ()=>{
        this.setState({showRooms: "none", showRoom: "flex", roomID: room_id})
      })
    }, 
    function(errorObject){
        console.log("the read failed: " + errorObject.code);
    })
  }

  sendMessage(text){
    var value = this.refs.form.getValue();
    console.log(this.state.roomID)
    var obj = {
      "message" : value["Message"],
      "user" : this.state.user.fullName
    }
    var ref = database.ref('/rooms/' + this.state.roomID + '/messages').push(obj)
  }

  backToRooms(){
    this.setState({
      messages: []
    })
  }

  render() {
    console.log('this is the state', this.state)

   if(this.state.messages.length < 1){

    return (
      <View style={styles.container}>
        <View style={{marginTop: 50, display: this.state.showRooms}}>
          {this.state.rooms.map( (room, idx)=>{
            if(room.user.fullName){
              return <Button
              key={idx}
              title={room.user.fullName} 
              onPress={
                
                ()=>{this.touch(room.room_id)}

              } />
            }
          } )}
        <Button title='Go Back' onPress={() => this.props.nav.navigateBack()} />
        </View>
        </View>
        )} 

      else{
      return(     
       <ScrollView style={styles.container}>
        <View style={{display: this.state.showRoom}}>
          {this.state.messages.map( (message, idx)=>{
            return <Text key={idx} style={styles.message}> {message.user} :     {message.message}</Text>
          } )}

          <Form
            ref="form"
            type={this.state.Person} />
          <TouchableHighlight style={styles.button} onPress={()=>{this.sendMessage()}} underlayColor='red'>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableHighlight>
          <Button title='Go Back' onPress={() => this.props.nav.navigateBack()} />
        </View>
      </ScrollView>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 20
  },
  contentContainer: {
    paddingVertical: 20
  },
  message: {
    borderColor: "red",
    borderWidth: 2,
    padding: 5
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
  
})


const getChatRooms = gql`
{
  getChatRooms(id: 2) {
    id
    room_id
    user{
      id
      fullName
    }
  }
}`

export default withApollo(Chat);