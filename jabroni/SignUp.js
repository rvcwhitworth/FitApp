import React from 'react';

import { Alert, StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup } from 'react-native-elements'
var t = require('tcomb-form-native');
var Form = t.form.Form;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'clientHome'})    
  ]
})

var Email = t.refinement(t.String, function (s) {
  return /@/.test(s);
});

var Password = t.refinement(t.String, function (s) {
  return s.length >= 2;
});

function samePasswords(x) {
  return x.newPassword === x.confirmPassword;
}

var options = {
  error: 'Passwords must match',
  fields: {
    email: {
      error: 'Invalid email'
    },
    newPassword: {
      type: 'password',
      password: true,
      secureTextEntry: true,
      error: 'Invalid password, enter at least 2 chars'
    },
    confirmPassword: {
      type: 'password',
      password: true,
      secureTextEntry: true,
      error: 'Invalid password, enter at least 2 chars'
    }
  }
};

var Type = t.enums({
  Client: 'Client',
  Trainer: 'Trainer'
});

var Goal = t.enums({
  Tone: 'Tone',
  BulkUp: 'Bulk Up',
  Slim: 'Slim Down'
});

var Person = t.subtype(t.struct({
  name: t.String,
  username: t.String,
  email: Email,
  newPassword: Password,
  confirmPassword: Password,
  age: t.Number,               // a required number
  type: Type,
  Goals: Goal,
  rememberMe: t.Boolean 
}), samePasswords);

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.onPress = this.onPress.bind(this)

  }


  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    console.log('value: ', value);
    if (value) { // if validation fails, value will be null
      this.props.mutate({
        variables: {
          username: value.username.toLowerCase(),
          password: value.newPassword,
          type: value.type.toLowerCase(),
          email: value.email,
          fullName: value.name,
          profile_data: JSON.stringify({goals: value.Goals, age: value.age, rememberMe: value.rememberMe})
        }
      })
      .then(({data}) => {
        console.log('data to send to async storage: ', data);
        if (data.setUser) {
          AsyncStorage.setItem('@FitApp:UserInfo', JSON.stringify(data.setUser))
          .then(() => this.props.navigation.dispatch(resetAction))
          .catch((err) => console.error('Error writing user info to storage', err))
        }
      })
      .catch((err) => console.log('Error signing up', err));
    } else{
      Alert.alert('Invalid input!', 'Please try again.');
    }
  }

  render(){
    const buttons = ['Trainer', 'Client']
    const { selectedIndex } = this.state
    return (
        <ScrollView style={styles.scrollView}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='red'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>

          <Button style={{marginTop: 10}}title="Already have an account? log in" onPress={() => {
            this.props.navigation.navigate('landing');
          }}/>
          <View style={{marginBottom: 25}}/>
        </ScrollView>
    )

  }
}

var styles = StyleSheet.create({
  scrollView:{
    flex:1,
    paddingTop: 15,
    paddingLeft: 5,
    paddingRight: 5
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

const m = gql`
  mutation setUser($username: String!, $password: String!, $fullName: String!, $email: String, $type: String!, $profile_data: String){
    setUser(username: $username, password: $password, fullName: $fullName, email: $email, type: $type, profile_data: $profile_data) {
      id
      username
      fullName
      type
      email
      profile_data
    }
  }
`

export default graphql(m)(SignUpScreen);