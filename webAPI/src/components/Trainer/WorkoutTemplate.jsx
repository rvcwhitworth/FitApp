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
  }

  testingForms(e){
  	var x = this.state.WorkoutName
  	console.log('what is x??', this.state)
    this.setState({
    	template: this.state.template.concat(x),
    	WorkoutName: ''
    }, () => {
    	console.log(this.state)
    })
  }

  testingInputs(e){
  	console.log('what is the target', e.target)
  	this.setState({WorkoutName: e.target.value},
  		() => console.log(this.state.WorkoutName))
  }

  render() {

      return(
        <div>
        {this.state.template.map((val, key)=>{
        	console.log('what is val?', val)
        	return(<Workout name={val} />)
        })}
        <button value='tester' onClick={(e) =>{ this.testingForms(e)}}> Add workouts! </button>
        <input onChange={this.testingInputs} placeholder='Workout Name' value={this.state.WorkoutName} /> 
        <button onClick={() => {this.props.save(this.state.template)} } className="btn btn-lg btn-block" type='button' >Save Template</button>

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