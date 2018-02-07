import React from 'react'
import { View, AsyncStorage, Text, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions, ScrollView, Image } from 'react-native'
import {Card, List, ListItem} from 'react-native-elements'
import Chat from '../utilities/chatIcon'
import Nav from './trainerNav.js'
import SVG from '../SVG/svg4Right.js'
import { graphql, ApolloProvider, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import firebase from '../utilities/firebase.js'

const { width, height } = Dimensions.get('window');


const database = firebase.database();

  // async componentDidMount() {
  //   await AsyncStorage.setItem('key' : 'I like to save it.')
  //   //JSON stringify the data into storage and JSON parse it out, THIS IS SO AMAZING
  // }

class TrainerFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feed: [],
      trainer: '',
      keys: []

    }
  }


  componentDidMount() {
    this.props.nav.cleanUp()
    const { nav } = this.props;
    AsyncStorage.getItem('@FitApp:UserInfo')
    .then((userInfoString) => {
      this.setState({trainer: JSON.parse(userInfoString)}, ()=>{
        database.ref('UserData/' + this.state.trainer.id).on("child_added", (snapshot)=>{
          this.state.feed.push(snapshot.val())
        });
        // console.log('inside setstate', this.state.feed)
      }) 

    }).then(()=>{
      // console.log(".then to the ,then", this.state.feed)
    })
    .catch((err) => console.error('Error retrieving user info from storage!', err));

    // nav.onNavigateDownShouldAllow(() => {
    //   return false;
    // });
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    const users = [
      {
         name: 'brynn',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
      },
     ]
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>  
      <View style={{flex:1, marginBottom: 0}}>
        <SVG />
      </View>  
    {/* // {this.setState({workouts: Object.entries(this.state.feed.workout)}, ()=>{})} */}


      {/* {console.log('Complete Feed', this.state.feed)} */}


        {/* <View style={{flex: 1}}> */}

          {/* <ScrollView>
            {console.log(this.state.feed)}
            {this.state.feed.map((ele)=>{
              return <Text>{ele.order}</Text>
            })}
          </ScrollView> */}
          
{/* 
          <Card title="CARD WITH DIVIDER">
            {
              users.map((u, i) => {
                return (
                  <View key={i} style={styles.user}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{ url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg' }}
                    />
                    <Text style={styles.name}>{u.name}</Text>
                  </View>
                );
              })
            }
          </Card> */}


          <List containerStyle={{marginBottom: 20, flex: 1}}>
            {
              this.state.feed.map((ele, i) => {
                console.log(ele);
                if(ele.diet){
                  return 
                  <ListItem
                    rightIcon={{ style: { color:"white" } }}
                    roundAvatar
                    // avatar={{uri:l.avatar_url}}
                    key={i}
                    title={ele.user + ' DIET  ' + ele.date}
                    subtitle={'Calories: ' + ele.diet.calories + ', Carbs: ' + ele.diet.carbs + ', Fat: ' + ele.diet.fat + ', Protein: ' + ele.diet.protein}
                  />
                }else{
                  this.setState({keys: Object.keys(ele.workout)}, ()=>{
                    console.log('AGAIN ==>', this.state.keys)
                  })
                  // return 
                  // console.log("HERE==>>", ele)
                  // <ListItem
                  //   rightIcon={{ style: { color:"white" } }}
                  //   roundAvatar
                  //   // avatar={{uri:l.avatar_url}}
                  //   key={i}
                  //   title={ele.user + ' WORKOUT ' + ele.date}
                  //   subtitle={'Barbell Squat: ' + ele.diet.calories + ', Carbs: ' + ele.diet.carbs + ', Fat: ' + ele.diet.fat + ', Protein: ' + ele.diet.protein}
                  // />
                }
                
              })
            }
          </List>
          {/* "date": "Tue Feb 06 2018",
   "diet": Object {
     "calories": 71.5,
     "carbs": 0.36,
     "fat": 4.76,
     "protein": 6.28,
   },
   "id": 12,
   "order": 1517936154922,
   "user": "Cp",
 }
 Object {
   "date": "Tue Feb 06 2018",
   "order": 1517936248872,
   "user": "Cp",
   "workout": Object {
     "Barbell Squat": Object {
       "frequency": "",
       "weight": "",
     },
     "Deadlift": Object {
       "frequency": "",
       "weight": "",
     },
     "Shoulder Press": Object {
       "frequency": "",
       "weight": "",
     },
   },
 } */}
          <Text style={{fontSize: 30, marginBottom: 50, textAlign:'center'}}>This is our trainer news feed for our guy</Text>
          <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
        {/* </View> */}
      
        <Nav nav={this.props.nav} index={0}/>
      </View>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: width,
    height: height,
    backgroundColor: 'white'
  },

  nav: {
    position: 'absolute',
    bottom:0,
  },

  button: {
    padding: 10,
    backgroundColor: 'blue',
    marginBottom: 15,
  }
})

const getSpotters = gql`
query getSpotters($id: Int!){
  getSpotters(id: $id, type: "trainer") {
    id
  }
}`

export default withApollo(TrainerFeed);