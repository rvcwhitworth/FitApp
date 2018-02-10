import React from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native'
import { graphql, ApolloProvider, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Divider } from 'react-native-elements'
import firebase from './firebase.js'

var t = require('tcomb-form-native');
var Form = t.form.Form;

const database = firebase.database();

class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      propsReady: false,
      showRoom : "none",
      showRooms : "flex",
      // rooms: [],
      messages : [],
      presentUser: '',
      presentUserID: '',
      currentRoom: '',
       Person: t.struct({
          Message: t.String,
        }),
        
    }
    this.touch = this.touch.bind(this)
    this.send = this.send.bind(this)
    // this.getStore = this.getStore.bind(this)
    // this.backToRooms = this.backToRooms(this)
    
  }
  componentWillMount(){
  }

  componentDidMount() {
    // console.log("DID MOUNT")
 
    AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
      if (err) console.log(err);
        // else {console.log("STORE STORE STORE STORE +++>>><+++===>>>",val, JSON.parse(val))}

      var storeVals = JSON.parse(val);

      this.state.presentUser = storeVals.username;
      this.state.presentUserID = storeVals.id; 
      // Based Async Store Changes For ID
      this.props.client.query({
        query: getChatRooms,
        variables: {
          id: this.state.presentUserID
        }
      }).then((data)=>{
        this.setState({rooms: data.data.getChatRooms, propsReady: true}) 
      })
    })  

  }

  touch(room_id){
    this.setState({currentRoom: room_id }, ()=>{
      database.ref('/rooms/' + this.state.currentRoom + '/messages').on("child_added", (snapshot)=>{
        this.state.messages.push(snapshot.val())
        this.setState({showRooms: "none", showRoom: "flex"})
      },
      function(errorObject){
        console.log("the read failed: " + errorObject.code);
      })
    })

  }
  send(){
    var value = this.refs.message.getValue();
    database.ref('/rooms/' + this.state.currentRoom + '/messages').push({user: this.state.presentUser, message: value.Message})
  }

  render() {
    if(!this.state.propsReady){
      return (<Text>Loading....</Text>)
    }
    return (

      <View style={styles.container}>
        {/* <Text>HELLOOHHELLELOOOOOOO</Text> */}
        <View style={{ display: this.state.showRooms}}>
        
          <TouchableHighlight style={styles.button} onPress={()=>{console.log("press", this.props); this.props.navigation.goBack()}} underlayColor='red'>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableHighlight>

          
          <View >
            {/*console.log("COMP")*/}
            {this.state.rooms.map( (room, idx)=>{
              if(room.user.fullName){
                return <Button
                  key={idx}
                  title={room.room_id}
                  onPress={ ()=>{this.touch(room.room_id)}  }
                />
              }
            })}
          </View> 

        </View>
          

        <View style={{display: this.state.showRoom, flex: 1}}>
          <TouchableHighlight style={styles.button} onPress={ ()=>{ this.setState({showRooms: "flex", showRoom: "none"}) } } underlayColor='red'>
            <Text style={styles.buttonText}>Back To Rooms</Text>
          </TouchableHighlight>

          <ScrollView ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{ this.scrollView.scrollToEnd({animated: true})}} >
            {this.state.messages.map( (message, idx)=>{
              if(this.state.messages.length > 0){
                return <Text key={idx} style={styles.message}> <Text style={styles.user}>{message.user}</Text> :     {message.message}</Text>
              }
            })}
          </ScrollView>

           <View style={{display: this.state.showRoom, paddingBottom: 10}}>
            <Form
              ref="message"
              type={this.state.Person}
            />
            <TouchableHighlight style={styles.button} onPress={()=>{this.send(), console.log("press")}} underlayColor='red'>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableHighlight>
          </View>

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
  },
  user: {
    flex: 1,
    backgroundColor: "cyan",
    paddingTop: 200
  }

})

var getChatRooms = gql`
query getChatRooms($id: Int!){
  getChatRooms(id: $id) {
    id
    room_id
    user{
      id
      fullName
    }
  }
}`



export default withApollo(Chat);