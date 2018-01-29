import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableHighlight } from 'react-native';
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
// var Person = t.struct({
//   name: t.String,              // a required string
//   Email: Email,              // a required string
//   password: t.String,              // a required string
//   ConfirmPassword: t.String,              // a required string
//   age: t.Number,               // a required number
//   type: Type,
//   Goals: Goal,
//   rememberMe: t.Boolean        // a boolean
// });

var Person = t.subtype(t.struct({
  name: t.String,
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
    this.signUp = this.signUp.bind(this);
    this.onPress = this.onPress.bind(this)

  }

  signUp(e){
    e.preventDefault();
    // make axios request to server to get userID
    // axios.get('/users', {u: e.target..., p: e.target....}).then...
    console.log('LOG IN');
    // navigate to clientHomeScreen
    this.props.navigation.dispatch(resetAction);
  }

  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      if(value.password === value.ConfirmPassword); // value here is an instance of Person
      this.props.navigation.dispatch(resetAction);    
    }else{

    }
  }

  render(){
    const buttons = ['Trainer', 'Client']
    const { selectedIndex } = this.state
    console.log('SignUpScreen props: ', this.props.navigation);
    return (
    
      // <View style={styles.container}>
      
        <ScrollView style={styles.scrollView}>
          <Form
            ref="form"
            type={Person}
             options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='red'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      //  </View>)
    )

  }
}

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

export default SignUpScreen;




    // <View>
    //   <Text>Signup form... CHANGE</Text>

    //   <Form
    //       ref="form"
    //       type={Person}
    //       // options={options}
    //     />

    //   <FormLabel>Name</FormLabel>
    //   <FormInput ref="nameInput" onChangeText={(text)=>{this.setState({name: text})}}/>
    //   <FormValidationMessage>
    //     {this.state.err}
    //   </FormValidationMessage>

    //   <FormLabel>E-mail</FormLabel>      
    //   <FormInput ref="EnameInput" onChangeText={(text)=>{this.setState({email: text})}}/>
    //   <FormValidationMessage>
    //     error
    //   </FormValidationMessage>

    //   <FormLabel>Who Are You</FormLabel>      
    //   <ButtonGroup
    //     onPress={this.updateIndex}
    //     selectedIndex={selectedIndex}
    //     buttons={buttons}
    //     containerStyle={{height: 50}}
    //   />
    //   <FormLabel >Password</FormLabel>      
    //   <FormInput ref="passworInput" onChangeText={(text)=>{this.setState({password: text})}}/>
    //   <FormValidationMessage>
    //     {this.state.err}
    //   </FormValidationMessage>

    //   <FormLabel>Re-Enter Password</FormLabel>      
    //   <FormInput ref="repasswordInput" onChangeText={(text)=>{this.setState({email: text})}}/>
    //   <FormValidationMessage>
    //     {this.state.err}
    //   </FormValidationMessage>


    //   <Button title="sign up" onPress={this.signUp} />

    // </View>)




      // updateIndex (selectedIndex) {
  //   this.setState({selectedIndex})
  // }

  // onChange(value) {
  //   // recalculate the type only if strictly necessary
  //   const type = value.country !== this.state.value.country ?
  //     this.getType(value) :
  //     this.state.type;
  //   this.setState({ value, type });
  // }


    // errorHandler() {
  //   if (this.state.err) {
  //     this.formInput.shake()
  //   }
  // }