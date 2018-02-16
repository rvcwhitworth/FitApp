import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, Button, Alert, AsyncStorage } from 'react-native'
import Chat from '../utilities/chatIcon'
import FooterNav from './FooterNav.js'
import SVG from '../SVG/svg5Bottom.js'
import { graphql, withApollo } from 'react-apollo';

const { width, height } = Dimensions.get('window');
import {setDailyRecord} from '../utilities/mutations.js';

class DailyInputs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: '#9575CD',
      weight: '',
      BodyFatPer: '',
      height: '',
      waist: '',
      hip: '',
      neck: ''
    }

    this.handleInputs = this.handleInputs.bind(this);
    this.Calculate = this.Calculate.bind(this);
    this.submitData = this.submitData.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.props.nav.cleanUp()
    const { nav } = this.props;

    nav.onNavigateShouldAllow(() => {
       return true;
    });
    this.props.nav.cleanUp()
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  handleInputs(text, id){
    var objCreate = () => {
      var obj = {}
      obj[id] = text
      return obj
    }
    this.setState(objCreate)
  }

  Calculate(){
    var height = Number(this.state.height)
    var bfPercent = 495/(1.29579-.35004 * Math.log10(Number(this.state.waist)*2.54 + Number(this.state.hip)*2.54 - Number(this.state.neck)*2.54) + .22100*Math.log10(height*2.54)) - 450
    bfPercent = bfPercent.toFixed(2)
    this.setState({
      BodyFatPer: bfPercent
    })
  }

  submitData(){
    // send data to graphQL using imported mutation
    AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
      if ( err ) {
        console.log('asyncStorage error in dailyInputs component');
        Alert.alert('something went wrong...');
      } else {
        console.log('submitting daily input');
        let id = JSON.parse(val).id;
        let data = Object.assign({}, this.state, {color: undefined});
        this.props.client.mutate({
          mutation: setDailyRecord,
          variables: {
            user_id: id,
            data: JSON.stringify(data)
          }
        }).then(({data}) => {
          console.log('graphQL success!', data);
          this.reset();
        }).catch(err => {
          console.log('apollo error: ', err);
        })
      }
    })

  }

  reset(){
    this.setState({
      color: '#9575CD',
      weight: '',
      BodyFatPer: '',
      height: '',
      waist: '',
      hip: '',
      neck: ''
    })
  }

  render() {
    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
        <View style={styles.list}>
          <SVG />
          <Text style={{margin: 10, height: 50, paddingLeft: 5, paddingTop: 20}}>How are you doing today?</Text>

          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Weight Here'
          onChangeText={(text) => this.handleInputs(text, 'weight')}
          value={this.state.weight} />

          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Body Fat Percentage Here'
          onChangeText={(text) => this.handleInputs(text, 'BodyFatPer')}
          value={this.state.BodyFatPer} />

          <Button style={{marginTop: 10}}title="Save your measurements" onPress={this.submitData}/>

          <View> 
          <Text style={{margin: 10, height: 50, paddingLeft: 5, paddingTop: 20}}>Body Fat Percentage Calculator</Text>

          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Weight Here (Lbs)'
          onChangeText={(text) => this.handleInputs(text, 'weight')}
          value={this.state.weight} />

          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Height Here (Inches)'
          onChangeText={(text) => this.handleInputs(text, 'height')}
          value={this.state.height} />

          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Waist Measurement Here (Inches)'
          onChangeText={(text) => this.handleInputs(text, 'waist')}
          value={this.state.waist} />
          </View>

          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Hip Measurement Here (Inches)'
          onChangeText={(text) => this.handleInputs(text, 'hip')}
          value={this.state.hip} />

          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Neck Measurement Here (Inches)'
          onChangeText={(text) => this.handleInputs(text, 'neck')}
          value={this.state.neck} />

          <Button style={{marginTop: 10}}title="Calculate Your Body Composition!" onPress={this.Calculate}/>

          <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
        </View>
        <FooterNav nav={this.props.nav} index={0}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  //  backgroundColor: 'transparent',
    flex: 1,
  },

  list: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
  }
})

export default withApollo(DailyInputs)