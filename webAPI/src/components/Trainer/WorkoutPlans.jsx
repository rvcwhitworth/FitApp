import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'
import Template from './WorkoutTemplate.jsx'

class WorkoutPlans extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        creating: false
      }
      this.createTemplate = this.createTemplate.bind(this)
      this.finishedTemplate = this.finishedTemplate.bind(this)
  }

  componentWillReceiveProps(nextProps) {

  }

  createTemplate(e){
    console.log('are we transitioning?')
    this.setState({
      creating: true
    })
  }

  finishedTemplate(obj){
    this.setState({
      creating: false,
      workout: obj
    })
  }

  render() {
    console.log('how many times???')
    if(this.state.creating){
      return(<Template save={this.finishedTemplate} />)
    } else{
      return(
        <button onClick={() => {this.createTemplate()}} className="btn btn-lg btn-block" type='button' >Create a new Template</button>
        )
    }
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
  };
};

export default withRouter(connect(
  mapStoreToProps
)(WorkoutPlans));