import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native'
import { graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Divider } from 'react-native-elements'
import firebase from './utilities/firebase.js'

// import * as firebase from 'firebase';
import TOKENS from './../TOKENS.js';
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


    // this.props.client.query({
    //   query: q,
    //   variables: {
    //     username: values.username.toLowerCase(),
    //     password: values.password
    //   }

var database = firebase.database();

class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showRoom : "none",
      showRooms : "flex",
      messages : [],
       Person: t.struct({
          Message: t.String,
        }),
    }
    this.touch = this.touch.bind(this)
    console.log('this ,bdfwhkfwejfkfnjounted roigjht')
  }
  componentWillMount() {
    console.log('this ,bdfwhkfwejfkfnjounted roigjht')
    // AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
    //   if (err) console.log(err);
    //   else {
    //     if(val){
    //     console.log('who is dis?????', val)
    //     }
    //   }
    // })

  }
  touch(room_id){
    database.ref('/rooms/' + room_id + '/messages').on("value", (snapshot)=>{
      this.setState({messages: Object.values(snapshot.val())}, ()=>{
        this.setState({showRooms: "none", showRoom: "flex"})
      })
    }, 
    function(errorObject){
        console.log("the read failed: " + errorObject.code);
    })
  }

  render() {
    console.log('FULLLLLLLLLLBSSSSS')
    if(this.props.data.loading){
      return (<Text>Loading....</Text>)
    }
    return (
      <View style={styles.container}>

        <View style={{marginTop: 50, display: this.state.showRooms}}>
          {/* <Text> Maybe this could be our chat? <Text>{console.log(">>>+++>>>",this.props.data.getChatRooms[0])}</Text></Text> */}
          {this.props.data.getChatRooms.map( (room, idx)=>{
            console.log(room)
            if(room.user.fullName){
              return <Button
              key={idx}
              title={room.user.fullName} 
              onPress={
                
                ()=>{this.touch(room.room_id)}

              }
              />
            }
          } )}
        </View>
        <View style={{display: this.state.showRoom}}>
          {this.state.messages.map( (message, idx)=>{
            return <Text key={idx} style={styles.message}> {message.user} :     {message.message}</Text>
          } )}
          <Form
            ref="form"
            type={this.state.Person}
          />
          <TouchableHighlight style={styles.button} onPress={()=>{console.log("press")}} underlayColor='red'>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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

const q = gql`
  query loginUser($username: String!, $password: String!){
    loginUser(username: $username, password: $password) {
      id
      fullName
      username
      type
      email
      profile_data
    }
  }
`

const getChatRooms = gql`
  query getChatRooms($id: Int!) {
    getChatRooms(id: $id){
    id
    room_id
    user{
      id
      fullName
    }
  }
}`

export default graphql(getChatRooms)(Chat)