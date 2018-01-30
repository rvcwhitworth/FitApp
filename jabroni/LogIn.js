import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableHighlight } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup } from 'react-native-elements'
var t = require('tcomb-form-native');
var Form = t.form.Form;

var styles = StyleSheet.create({
  scrollView:{
    // flex:1,
    padding: 10
    // backgroundColor:'blue'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
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
  }
});

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'clientHome'})    
  ]
});

var Person = t.struct({
  username: t.String,
  password: t.String
});

const q = gql`
  query loginUser($username: String!, $password: String!){
    loginUser(username: $username, password: $password) {
      id
    }
  }
`

class logInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
    this.logIn = this.logIn.bind(this);
    console.log('login props: ', this.props);
  }

  logIn(e){
    e.preventDefault();
    // make axios request to server to get userID
    // axios.get('/users', {u: e.target..., p: e.target....}).then...
    let values = this.refs.form.getValue();
    console.log('logging in with values: ', values);
    this.props.client.query({
      query: q,
      variables: {
        username: values.username,
        password: values.password
      }
    }).then((result) => {
      console.log('log in result: ', result);
      this.props.navigation.dispatch(resetAction);
    }).catch((err) => {
      console.log('log in error: ', err);
      alert('error!');
      this.setState({
        error: true
      });
    })
    // navigate to clientHomeScreen
  }

  render(){
    return (
    <View>
      <ScrollView style={styles.scrollView}>
          <Form
            ref="form"
            type={Person}
          />
          <TouchableHighlight style={styles.button} onPress={this.logIn} underlayColor='red'>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
        </ScrollView>
    </View>);
  }
}

export default withApollo(logInScreen);