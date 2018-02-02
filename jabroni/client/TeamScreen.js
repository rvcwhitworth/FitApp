import React from 'react';
import { Alert, StyleSheet, Image, View, Text, Dimensions, Button, Keyboard } from 'react-native';
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
      photos: {}
    }
    this.search = this.search.bind(this);
    this.addSpotter = this.addSpotter.bind(this);
  }

  addSpotter(id) {
    Alert.alert('+ clicked', 'user id:' + id);
  }

  search() {
    // send this.state.searchTerm to graphQL query
    this.setState({loading: true, photos: {}, searchResults: []}, () => {
      this.props.client.query({
        query: q,
        variables: {
          fullName: this.state.searchTerm
        }
      }).then((results) => {
        // do something with the results
        console.log('response from search: ', results.data);
        let temp = this.state.searchResults;
        results.data.getUsersByFullName.forEach((person) => {
          temp.push(person);
        });
        this.setState({searchResults: temp}, () => {
          this.state.searchResults.forEach((user) => {
            user.picURL = 
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
    <View style={{flexDirection: 'column', width:width, height:height, backgroundColor: 'white'}}>
      <View style={{flex: 1, marginTop: 5}}>
        <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
          <SearchBar lightTheme style={{height: 40, width: width, margin: 10}} clearIcon={{color: '#86939e', name: 'close'}} 
            placeholder="find spotters" onChangeText={(text) => this.setState({searchTerm: text})} 
            onClearText={() => this.setState({searchTerm: ''})} ref={searchBar => this.searchBar = searchBar}
          />
          <Button onPress={this.search} title="search" />
        </View>
      </View>
      <View style={{flex: 8, justifyContent: 'center'}}>
        {this.state.loading ? <Text style={{textAlign: 'center', fontSize: 16}}> Searching for spotters! </Text> :
        this.state.searchResults.map((user) => {
          return (
            <View style={{flexDirection: 'row', width: width, margin: 10}}>
              {this.state.photos[user.id] ? 
                (<Image source={{ uri: `data:image/jpg;base64,${this.state.photos[user.id]}` }} style={styles.circle}/>) :
                (<Image source={{ uri: ''}}/>)}
              <View style={{flex : 1}}>
                <Text>Username: {user.username}</Text>
                <Text>Name: {user.fullName}</Text>
              </View>
              <Button title={'+'} onPress={() => this.addSpotter(user.id)}/>
            </View>
          )
        })}
        <Chat nav={this.props.nav}/>
      </View>
      <FooterNav nav={this.props.nav} index={4} />
    </View>);
  }
}

const q = gql`
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

const styles = StyleSheet.create({
  circle: {
    height: 50,
    width: 50,
    borderRadius: 50/2
  }
})

export default withApollo(TeamScreen)

