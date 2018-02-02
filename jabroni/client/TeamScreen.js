import React from 'react';
import { View, Text, Dimensions, Button, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import FooterNav from './FooterNav.js'
import Chat from '../utilities/chatIcon'

class TeamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [{fullName: 'test'}]
    }
    this.search = this.search.bind(this);
  }

  search() {
    // send this.state.searchTerm to graphQL query
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
      this.setState({searchResults: temp});
    }).catch((err) => {
      console.log('graphQL error in teamScreen query: ', err);
    }).then(() => {
      this.setState({searchTerm: ''});
      this.searchBar.clearText();
    })

    Keyboard.dismiss();
  }
  
  render(){
  	const { width, height } = Dimensions.get('window');

    return (
    <View style={{flexDirection: 'column', width:width, height:height, backgroundColor: 'white'}}>
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
        <SearchBar lightTheme style={{height: 40}} clearIcon={{color: '#86939e', name: 'close'}} 
          placeholder="find spotters" onChangeText={(text) => this.setState({searchTerm: text})} 
          onClearText={() => this.setState({searchTerm: ''})} ref={searchBar => this.searchBar = searchBar}
        />
        <Button onPress={this.search} title="search" />
      </View>

      <View>
        <Text>
        {this.state.searchResults[this.state.searchResults.length-1].fullName}
        {this.state.searchResults[this.state.searchResults.length-1].email}
        {this.state.searchResults[this.state.searchResults.length-1].profile_data}
        </Text>
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
    }
  }
`

export default withApollo(TeamScreen)

