import React from 'react'
import { View, AsyncStorage, Text, TextInput, StyleSheet, TouchableOpacity, Button, Dimensions, ScrollView, Image } from 'react-native'
import {Card, List, ListItem, Badge} from 'react-native-elements'
import Chat from '../utilities/chatIcon'
import Nav from './trainerNav.js'
import SVG from '../SVG/svg4Right.js'
import { graphql, ApolloProvider, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import firebase from '../utilities/firebase.js'

const database = firebase.database();
const { width, height } = Dimensions.get('window');

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
          // console.log('STATE FEED',this.state.feed)
        });
      }) 

    })

    // nav.onNavigateDownShouldAllow(() => {
    //   return false;
    // });

  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    if(this.state.feed.length < 0){
      return(<View>
        No New Updates!!
        </View>
        )
    }
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>  
        
        <View style={{flex:1}}>
          <SVG />
        </View> 
       
        <ScrollView ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{ this.scrollView.scrollToEnd({animated: true})}}>
        {
          this.state.feed.map((ele, i)=>{
            if(ele.diet){
              return (
                <Card key={i}
                  avatar={{url: "https://img00.deviantart.net/f161/i/2005/120/e/1/_superman_kal_el__by_quintessentialmorose.jpg"}}
                  title={ele.user}>
                  {
                    <View key={i} style={styles.user}>
                      <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ url: "https://img00.deviantart.net/f161/i/2005/120/e/1/_superman_kal_el__by_quintessentialmorose.jpg"}}
                      />

                      <Badge
                        value={ele.diet.name}
                      />

                      <Text style={styles.name}>{'Calories: ' + ele.diet.calories + ', Carbs: ' + ele.diet.carbs + ', Fat: ' + ele.diet.fat + ', Protein: ' + ele.diet.protein}</Text>
                    </View>
                  }
                </Card>
              )
            }else{
              var keys = Object.keys(ele.workout)
              return(
                <Card title={ele.user}>
                  {
                    keys.map((key, idx)=>{
                      return( 
                        // <ListItem
                        //   rightIcon={{ style: { color:"white" } }}
                        //   key={idx}
                        //   // roundAvatar
                          
                        //   title={key + ": Freq" + ele.workout[key].frequency + ', Weight ' + ele.workout[key].weight}
                        //   // avatar={{uri:u.avatar}}
                        // />
                        <View>
                        <Badge value={key} key={idx}/>
                        <Text key={idx}>{" Freq:" + ele.workout[key].frequency + ' Weight: ' + ele.workout[key].weight}</Text>
                        </View>
                      )
                    })
                  }
                </Card>
              )
            }
          })

        }
      </ScrollView>

        <View style={{flex: 2}}>
          <Text style={{fontSize: 30, marginBottom: 50, textAlign:'center'}}>This is our trainer news feed for our guy</Text>
          <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
        </View>
        <Nav nav={this.props.nav} index={0}/>
    </View>);
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

{/* <View style={{flex:1}}>
  {
    this.state.feed.map((ele, idx)=>{
      console.log("MAPPER",ele)
      if(ele.diet){
        return <Text key={idx}>{ele.diet.name + ': ' + 'Calories: ' + ele.diet.calories + ', Carbs: ' + ele.diet.carbs + ', Fat: ' + ele.diet.fat + ', Protein: ' + ele.diet.protein}</Text>
      }else{
        var keys = Object.keys(ele.workout)

        return keys.map((key, idx)=>{
          // console.log("KEY", key, "OBJECT ",ele.workout)
          // console.log("AHH HAA", ele.workout[key].weight)
          return <Text key={idx}>{key + " Freq:" + ele.workout[key].frequency + ' Weight: ' + ele.workout[key].weight}</Text>
        })
      }
    })
  }
</View>   */}