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
        creating: false,
        backgroundImage: this.props.backgroundImage,
        plans: this.props.plans
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

  divClick(){
    console.log('YESSSS')
  }

  finishedTemplate(obj){
    this.setState({
      creating: false,
    })
  }

  render() {
    console.log(this.state)
    if(this.state.creating){
      return(
        <div>
          <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
          <Template save={this.finishedTemplate} />
        </div>)
    } else{
      return(
        <div style={{flexDirection:'Column'}}>
        <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
        <div>
        {this.state.plans.map((val, key) =>{
          return(
            <div className="card" key ={key} onClick={this.divClick}style={{width: "12rem", maxheight:'20rem', padding:'10px', float:'left', cursor:'pointer'}}>
              <img className="card-img-top" src={val.photo} alt="Card image cap" />
              <div className="card-block">
                <h4 className="card-title">{val.name}</h4>
                <p className="card-text">{val.description}</p>
              </div>
            </div>
          )
        }
        )}
        </div>
          <button onClick={() => {this.createTemplate()}} className="btn btn-lg btn-block" type='button' >Create a new Template</button>
        </div>)
    }
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
    backgroundImage: store.branding.backgroundImg,
    plans: store.branding.template
  };
};

export default withRouter(connect(
  mapStoreToProps
)(WorkoutPlans));