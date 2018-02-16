import React from 'react';
import { Alert, StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup } from 'react-native-elements'
var t = require('tcomb-form-native');
var Form = t.form.Form;
let { getPhotosList, getPhotoURL } = require('../../s3_utilities.js');
let _ = require('underscore');

var styles = StyleSheet.create({
  scrollView:{
    // flex:1,
    padding: 10,
    justifyContent: 'center'
    // backgroundColor:'blue'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5
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
      fullName
      username
      type
      email
      profile_data
    }
  }
`

var options = {
  fields: {
    username: {
      type: 'username'
    },
    password: {
      type: 'password',
      password: true,
      secureTextEntry: true,
    }
  }
}

class logInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
    this.logIn = this.logIn.bind(this);
    // console.log('login props: ', this.props);
  }

  componentDidMount(){
    AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
      if (err) console.log(err);
      else {
        if(val){
        this.props.navigation.dispatch(resetAction)
        }
      }
    })
  }



  logIn(e){
    e.preventDefault();
    let values = this.refs.form.getValue();
    this.props.client.query({
      query: q,
      variables: {
        username: values.username.toLowerCase(),
        password: values.password
      }
    }).then(({data}) => {
      if (!data.loginUser) {
        Alert.alert('Invalid username or password!', 'Please try again.');
      } else {
        AsyncStorage.setItem('@FitApp:UserInfo', JSON.stringify(data.loginUser))
        .then(() => {
          console.log('set user info.');
          getPhotosList(data.loginUser.id).then((list) => {
          // list is an array of objects containing the key for each photo in s3 bucket
          // store keys in async storage
          list = _.pluck(list, 'key');
          if ( list.indexOf(data.loginUser.id+'/') !== -1 ) {
            list.splice(list.indexOf(data.loginUser.id+'/'), 1);
          }

          let fixedList = [];
          list.forEach(url => {
            // get rid of the id/ at beginning of string
            let t = url.split('/');

            // splice out and store the timestamp at end of string separately
            let v = t[1].split('TIMESTAMP=');
            console.log('timestamp: ', v[1]);

            // replace the single quote with a forward slash
            let s = v[0].split("'").join('/');

            let u = "http://res.cloudinary.com/dvhehr6k8/image/upload/" + s;

            fixedList.push([u, v[1]]);
          });

          AsyncStorage.setItem('@FitApp:UserPics', JSON.stringify(fixedList))
          .then(() => {
            console.log('Successfully stored pic list:', fixedList);
            if ( JSON.parse(data.loginUser.profile_data).profilePictureURL ) {
              AsyncStorage.setItem('@FitApp:profilePictureURL', JSON.stringify(JSON.parse(data.loginUser.profile_data).profilePictureURL)).then(() => {
                this.props.navigation.dispatch(resetAction);
              }).catch((err) => {console.error('error writing profile picture to async storage')});
            } else {
              console.log('no profile picture URL set yet!');
              this.props.navigation.dispatch(resetAction);
            }
          }).catch((err) => {console.error('Error writing pic list to storage', err)})
        });
        }).catch((err) => console.error('Error writing user info to storage', err))
      }
    }).catch((err) => {
      console.log('log in error: ', err);
      Alert.alert('error logging in!', 'Check console for details');
      this.setState({
        error: true
      });
    });
  }

  render(){
    return (
    <View style={styles.container}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.logIn} underlayColor='red'>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
          <Button title="Don't have an account? sign up" onPress={() => {
              this.props.navigation.navigate('signUp');
            }}/> 
    </View>);
  }
}

export default withApollo(logInScreen);
