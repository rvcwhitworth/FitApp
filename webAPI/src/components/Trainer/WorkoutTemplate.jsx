import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import AddTemplate from '../../actions/addTemplate.jsx'
import axios from 'axios'
import Workout from './Workout.jsx'
import ImgHandler from './workoutTemplatePhotoUpload.jsx'
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import { Button, Card, Icon, Image, Segment, Divider, Container} from 'semantic-ui-react'
import { createExercisePlan } from '../../../utilities/mutations.jsx'




class Template extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        template : [],
        WorkoutName: '',
        templatePhoto: '',
        templateTitle: ''
      }
      this.testingForms = this.testingForms.bind(this)
      this.testingInputs = this.testingInputs.bind(this)
      this.tester123 = this.tester123.bind(this)
      this.saveMe = this.saveMe.bind(this)
      this.updateTemplateInfo = this.updateTemplateInfo.bind(this)
      this.picUpload = this.picUpload.bind(this)
      console.log('createExercisePlan', createExercisePlan)
  }

  testingForms(e){
  	var x = this.state.WorkoutName
    this.setState({
    	template: [...this.state.template, x],
    	WorkoutName: ''
    }, () => {
    	console.log(this.state)
    })
  }

  testingInputs(e){
  	this.setState({WorkoutName: e.target.value},
  		() => console.log(this.state.WorkoutName))
  }

  updateTemplateInfo(e){
    e.preventDefault()
    if(e.target.id === 'title'){
      this.setState({
        templateTitle: e.target.value
      })
    } else if(e.target.id === 'description'){
      this.setState({
        templateDescription: e.target.value
      })
    }
  }

  tester123(key, childState){
    if(this.state[key]){
      var x = Object.keys(this.state[key])
      var y = Object.keys(childState())
      var temp = childState()
    var state = () => {
      var obj = {}
      obj[key] = {}
      x.forEach((val) => {
        obj[key][val] = this.state[key][val]
      })
      y.forEach((val) => {
        obj[key][val] = temp[val]
      })
      console.log('here is the obj', obj)
      return obj
      }
    } 
    else {
      var state = () => {
        var obj = {}
        obj[key] = childState()
        return obj
      }
    }
      this.setState(state)
  }

  saveMe(){
    var obj = {}
    obj.name = this.state.templateTitle
    obj.description = this.state.templateDescription
    obj.photo = this.state.templatePhoto
    this.state.template.map((val, key) => {
      obj[val] = this.state[key]
    })
    this.props.dispatch(AddTemplate(obj))
    this.props.client.mutate({
      mutation: createExercisePlan,
      variables: {
        name: this.state.templateTitle,
        regimen: JSON.stringify(obj),
        trainer_id: this.state.id,
        client_id: this.state.id
      }
    }).then((...args) => console.log('hey it worked', ...args))
    obj.regimen = { description : this.state.templateDescription }
    this.props.save(obj)
  }

  picUpload(e){
    console.log('pic upload working???', e.target)
    var file = document.getElementById('file').files;
    // console.log(file)
    if (file) {
      var BackReader = new FileReader
      BackReader.onload = (e) => {
        var payload = { uri: e.target.result }
        this.setState({
          templatePhoto: e.target.result
        })
      };
      BackReader.readAsDataURL(file[0]);

      var formData = new FormData();
      formData.append("image", file[0]);
      // formData.append('user', this.state.id);
    }
  }

  render() {
    console.log('this is the state', this.state)
      return(
        <div key={this.state.key}>
        <div className="card" style={{width: "25rem", paddingBottom:'10px'}}>
              <ImgHandler img={this.state.templatePhoto} handleFile={this.picUpload}/>
              <div className="card-block">
                <input className="card-title" id='title' onChange={this.updateTemplateInfo} value={this.state.templateTitle} placeholder='Workout Name' />
                <input className="card-text" id='description' onChange={this.updateTemplateInfo} value={this.state.templateDescription}placeholder='Workout Description' />
              </div>
            </div>
        {this.state.template.map((val, key)=>{
        	console.log('what is val?', val)
        	return(<Workout name={val} key={key} number={key} parent={this.tester123}/>)
        })}
        <button value='tester' onClick={(e) =>{ this.testingForms(e)}}> Add workouts! </button>
        <input onChange={this.testingInputs} placeholder='Exercise Name' value={this.state.WorkoutName} /> 
        <Container fluid stlye={{position: 'fixed', bottom:0}}>
          <Segment padded>
            <Button style={{backgroundColor:'#06D6A0'}} fluid onClick={() => {this.saveMe()} }>Save Template</Button>
            <Divider horizontal>Or</Divider>
            <Button style={{backgroundColor:'#FFD166'}} fluid onClick={() => {this.props.cancel()}}>Cancel</Button>
         </Segment>
        </Container>
        </div>
        )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.id,
    user: store.auth.username,
    goals: store.auth.goals
  };
};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(Template)));