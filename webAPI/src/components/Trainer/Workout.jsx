import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'

class Workout extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        key: this.props.number,
        id : this.props.id || null,
        username : this.props.user || null,
        template : [],
        name : this.props.name || '',
        notes : '',
        currentSet: 0
      }
      this.testingForms = this.testingForms.bind(this)
      this.testingInputs = this.testingInputs.bind(this)
      this.handleInputs = this.handleInputs.bind(this)
      this.grabEverything = this.grabEverything.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState){
    console.log('this component is updating', nextProps, nextState)
    return true

  }

  testingForms(e){
  	var x = `Input : ${this.state.template.length}`
    var state = () => {
      var obj = {}
      obj.template = this.state.template.concat(x)
      obj.currentSet = this.state.currentSet+1
      obj[`${this.state.key}Set${this.state.currentSet}`] = `Set ${this.state.currentSet}`
      obj[`${this.state.key}Reps${this.state.currentSet}`]= ''
      obj[`${this.state.key}Weight${this.state.currentSet}`]= ''
      return obj
    }
    this.setState( state )
  }

  testingInputs(e){
    // e.persist()
    value = e.target.value
    console.log(e.target)
    console.log(e.target.value)
  	var prop = e.target.name

    var state = () => {
      var obj = {}
      obj[prop] = value
      console.log('whats the obj', obj)
      return obj
    }
  	this.setState(state, () => {
      this.props.parent(this.state.key, state)
    })
  }

  grabEverything(e){

    console.log(Document.getElementById('Input : 0').children)

  }

  handleInputs(e){
    var dynamicKey = () => {
    var obj = {}
    obj[e.target.name] = e.target.val
    return obj
  }
    this.setState( dynamicKey )
  }

  render() {
    console.log('state of affairs', this.state)

      return(
        <div class="container" style={{backgroundColor: 'rgba(0,0,0,.3)', margin:10}}>
        <h2>{this.state.name}</h2>
        {this.state.template.map((val, key)=>{
        	return(
            <div key={key} id={val}>
            <input name={`${this.state.key}Set${key}`} placeholder={'Set '+key} value={this.state[`${this.state.key}Set${key}`]} onChange={(e)=>{this.testingInputs(e)}} />
            <input name={`${this.state.key}Reps${key}`} placeholder='Number of Reps' value={this.state[`${this.state.key}Reps${key}`]} onChange={(e)=>{this.testingInputs(e)}} />
            <input name={`${this.state.key}Weight${key}`} placeholder='Weight' value={this.state[`${this.state.key}Weight${key}`]} onChange={(e)=>{this.testingInputs(e)}} />
            </div>
            )
        })}
        <button value='tester' onClick={(e) =>{ this.testingForms(e)}}> Add Sets! </button>
        <input placeholder='notes' name='notes' val={this.state.notes} onChange={this.handleInputs} />

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
)(Workout));