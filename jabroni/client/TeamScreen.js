import React from 'react';
import { FlatList, AsyncStorage, Alert, StyleSheet, Image, View, Text, Dimensions, Button, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import FooterNav from './FooterNav.js'
import Chat from '../utilities/chatIcon'
import firebase from '../utilities/firebase.js';

const imageStore = firebase.storage();

class TeamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
      loading: false,
      photos: {},
      spotters: []
    }
    this.search = this.search.bind(this);
    this.addSpotter = this.addSpotter.bind(this);
  }

  componentDidMount () {
    AsyncStorage.getItem('@FitApp:UserInfo')
    .then((userInfoString) => {
      this.state.user = JSON.parse(userInfoString);
      this.props.client.query({
        query: spotterQuery,
        variables: {
          id: this.state.user.id
        }
      }).then(({data}) => {
        this.setState({spotters: data.getSpotters}, () => {
          this.state.spotters.forEach(({trainer}) => {
            console.log('TRAINER in mount', trainer)
            imageStore
              .ref('images/' + trainer.id + '/profilePicture')
              .getDownloadURL()
              .then((url) => this.downloadPic(url, trainer.id))
          })
        })
      })
    })
  }

  addSpotter(user) {
    this.props.client.mutate({
      mutation: addSpotter,
      variables: {
        client_id: this.state.user.id,
        trainer_id: parseInt(user.id)
      }
    }).then(({data}) => {
      console.log('DATA AFTER SET', data)
      let searchResults = this.state.searchResults;
      searchResults.splice(searchResults.indexOf(user));
      this.setState({
        spotters: [...this.state.spotters, data.setSpotter.trainer],
        searchResults
      })
    })
  }

  search() {
    // send this.state.searchTerm to graphQL query
    this.setState({loading: true, searchResults: []}, () => {
      this.props.client.query({
        query: searchQuery,
        variables: {
          fullName: this.state.searchTerm
        }
      }).then((results) => {
        // do something with the results
        let temp = this.state.searchResults;
        results.data.getUsersByFullName.forEach((person) => {
          temp.push(person);
        });
        this.setState({searchResults: temp}, () => {
          this.state.searchResults.forEach((user) => {
            imageStore
              .ref('images/' + user.id + '/profilePicture')
              .getDownloadURL()
              .then((url) => this.downloadPic(url, user.id))
          })
        });
      }).catch((err) => {
        console.log('graphQL error in teamScreen query: ', err);
      }).then(() => {
        this.setState({searchTerm: '', loading: false});
        this.searchBar.clearText();
      })
    })

    Keyboard.dismiss();
  }
  
  downloadPic(url, userId) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = "text";
		xhr.onload = event => {
      let photos = this.state.photos;
      photos[userId] = xhr.response;
			this.setState({ photos });
		};
		xhr.open("GET", url);
		xhr.send();
	}

  render(){
  	const { width, height } = Dimensions.get('window');
    return (
    <View style={{alignContent: 'center', flexDirection: 'column', width:width, height:height, backgroundColor: 'white'}}>
      <Text style={styles.header}> Your Team </Text>

      {/*spotters */}
      <View style={{flex: 4, alignContent: 'center'}}>
        {this.state.spotters.map(({trainer}) => {
          console.log('TRAINER IN RENDER', trainer);
          return (
          <View key={trainer.id} style={{alignContent: 'center', justifyContent: 'space-around', alignContent: 'center', flexDirection: 'row', width: width  * (2/3), margin: 10}}>
            {this.state.photos[trainer.id] ? 
              (<Image source={{ uri: `data:image/jpg;base64,${this.state.photos[trainer.id]}` }} style={styles.circle}/>) :
              (<Image source={require('../../images/tearingMeApart.jpeg')} style={styles.circle}/>)}
            <View style={{flex : 1, marginLeft: 5}}>
              <Text>Username: <Text style={{fontWeight: 'bold'}}>{trainer.username}</Text></Text>
              <Text>Name: <Text style={{fontWeight: 'bold'}}>{trainer.fullName}</Text></Text>
            </View>
          </View>
          )
        })}
      </View>

      <Text style={styles.subHeader}> Add a Spotter </Text>
      <View style={{width: width, flex:1, flexDirection: 'row', justifyContent: 'center'}}>
        <SearchBar lightTheme style={{height: 40, margin: 10}} clearIcon={{color: '#86939e', name: 'close'}} 
          placeholder="find spotters" onChangeText={(text) => this.setState({searchTerm: text})} 
          onClearText={() => this.setState({searchTerm: ''})} ref={searchBar => this.searchBar = searchBar}
        />
        <Button onPress={this.search} title="search" />
      </View>
      <View style={{flex: 4, alignContent: 'center', justifyContent: 'flex-start'}}>
        {this.state.loading ? <Text style={{textAlign: 'center', fontSize: 16}}> Searching for spotters! </Text> :
        <FlatList
          data={this.state.searchResults}
          renderItem={(user) => {
            return (
              <View key={user.id} style={{alignContent: 'center', justifyContent: 'space-around', alignContent: 'center', flexDirection: 'row', width: width  * (2/3), margin: 10}}>
                {this.state.photos[user.id] ? 
                  (<Image source={{ uri: `data:image/jpg;base64,${this.state.photos[user.id]}` }} style={styles.circle}/>) :
                  (<Image source={require('../../images/tearingMeApart.jpeg')} style={styles.circle}/>)}
                <View style={{flex : 1, marginLeft: 5}}>
                  <Text>Username: <Text style={{fontWeight: 'bold'}}>{user.username}</Text></Text>
                  <Text>Name: <Text style={{fontWeight: 'bold'}}>{user.fullName}</Text></Text>
                </View>
                <Button title={'  +  '} onPress={() => this.addSpotter(user)}/>
              </View>
          )}}
        />}
        <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
      </View>
    <FooterNav nav={this.props.nav} index={4} />
  </View>);
  }
}

const searchQuery = gql`
  query getUsersByFullName($fullName: String!){
    getUsersByFullName(fullName: $fullName) {
      id
      fullName
      email
      profile_data
      username
    }
  }
`
const spotterQuery = gql`
query getSpotters($id: Int!){
  getSpotters(id: $id, type: "client") {
    trainer {
      username
      fullName
      id
    }
  }
}
`

const addSpotter = gql`
mutation setSpotter($trainer_id: Int!, $client_id: Int!){
  setSpotter(trainer_id: $trainer_id, client_id: $client_id, type: "support") {
    trainer {
      id
      fullName
      email
      profile_data
      username
    }
  }
}
`


const styles = StyleSheet.create({
  circle: {
    height: 50,
    width: 50,
    borderRadius: 50/2
  },
  header : {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  },
  subHeader : {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  }
})

export default withApollo(TeamScreen)

