import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'
import Workout from './Workout.jsx'

class Template extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        template : [],
        WorkoutName: ''
      }
      this.testingForms = this.testingForms.bind(this)
      this.testingInputs = this.testingInputs.bind(this)
      this.tester123 = this.tester123.bind(this)
      this.saveMe = this.saveMe.bind(this)
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
    this.state.template.map((val, key) => {
      obj[val] = this.state[key]
    })
    console.log('can we save this?', obj)
  }

  render() {
    console.log('this is the state', this.state)
      return(
        <div key={this.state.key}>
        {this.state.template.map((val, key)=>{
        	console.log('what is val?', val)
        	return(<Workout name={val} key={key} number={key} parent={this.tester123}/>)
        })}
        <button value='tester' onClick={(e) =>{ this.testingForms(e)}}> Add workouts! </button>
        <input onChange={this.testingInputs} placeholder='Workout Name' value={this.state.WorkoutName} /> 
        <button onClick={() => {this.saveMe()} } className="btn btn-lg btn-block" type='button' >Save Template</button>

        </div>
        )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
    goals: store.auth.goals
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Template));