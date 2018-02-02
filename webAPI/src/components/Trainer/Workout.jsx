import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'

class Template extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        template : [],
        name : this.props.name || '',
        notes : ''
      }
      this.testingForms = this.testingForms.bind(this)
      testingInputs = this.testingInputs.bind(this)
      handleInputs = this.handleInputs.bind(this)
  }

  testingForms(e){
  	var x = `Input : ${this.state.template.length}`
    this.setState({
    	template: this.state.template.concat(x)
    })
  }

  testingInputs(e){
  	console.log(e.target.name)
  	console.log(e.target, 'please be here!')
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

      return(
        <div>
        <h2>{this.state.name}</h2>
        {this.state.template.map((val, key)=>{
        	return(<input key={key} name={val} onClick={(e)=>{testingInputs(e)}} />)
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
)(Template));