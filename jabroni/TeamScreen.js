import React from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import FooterNav from './FooterNav.js'

class TeamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.search = this.search.bind(this);
  }

  search() {
    console.log('searching for: ', this.state.searchTerm);

    // send this.state.searchTerm to graphQL query
    this.props.client.query({
      query: q,
      variables: {
        searchTerm: this.state.searchTerm
      }
    }).then((results) => {
      // do something with the results
      console.log('response from search: ', results);
    }).catch((err) => {
      console.log('graphQL error in teamScreen query: ', err);
    })
    this.setState({searchTerm: ''});
    this.searchBar.clearText();
  }
  
  render(){
  	const { width, height } = Dimensions.get('window');
    console.log('state: ', this.state.searchTerm);
    return (
    <View style={{flexDirection: 'column', width:width, height:height, backgroundColor: 'white'}}>
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
        <SearchBar lightTheme style={{height: 40}} clearIcon={{color: '#86939e', name: 'close'}} 
          placeholder="find spotters" onChangeText={(text) => this.setState({searchTerm: text})} 
          onClearText={() => this.setState({searchTerm: ''})} ref={searchBar => this.searchBar = searchBar}
        />
        <Button onPress={this.search} title="search" />
      </View>
      <FooterNav nav={this.props.nav} index={3} />
    </View>);
  }
}

const q = gql`
  query getUsersByFullName($fullName: String!){
    getUsersByFullName(fullName: $fullName) {
      id
    }
  }
`

export default withApollo(TeamScreen)

