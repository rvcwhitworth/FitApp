import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'
import Template from './WorkoutTemplate.jsx'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Regimen from './RegimenCreation.jsx'
// import Styles from '../../www/ReactCSSAnimation.css'

class WorkoutPlans extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        creatingTemplate: false,
        backgroundImage: this.props.backgroundImage,
        plans: this.props.plans,
        popOut: null,
        show: false
      }
      this.createTemplate = this.createTemplate.bind(this)
      this.finishedTemplate = this.finishedTemplate.bind(this)
      this.popOutMenu = this.popOutMenu.bind(this)
      this.handleTemplateMenu = this.handleTemplateMenu.bind(this)
      this.createRegimen = this.createRegimen.bind(this)
      this.finishedRegimen = this.finishedRegimen.bind(this)
  }

  componentDidMount() {
    //here is where we will query??? or should we pull from redux that hopefully loaded everything
  }

  createTemplate(e){
    this.setState({
      creatingTemplate: true
    })
  }

  divClick(i){
    console.log('what is love?', this.state)
    if(i !== this.state.popOut){
    this.setState({
      popOut: i,
      show: !this.state.show
    })}
  }

  handleTemplateMenu(e){
    if(e.target.id === 'close'){
      this.setState({
        show:false,
      }, () => {
        this.setState({
          popOut: null
        })
      })
    } else{
      console.log('What did you click?', e.target.id)
    }
  }

  popOutMenu(i) {
    if(this.state.popOut === i){
      return (
        <CSSTransition 
          classNames="example"
          in={this.state.show}>
         <div key={i} style={{backgroundColor:'rgba(0,0,0,0.5'}}>
         <button onClick={this.handleTemplateMenu} id='View/Edit' className="btn btn-lg btn-block" type='button' >View/Edit</button>
         <button onClick={this.handleTemplateMenu} id='SendToClient' className="btn btn-lg btn-block" type='button' >Send to a client</button>
         <button onClick={this.handleTemplateMenu} id='Delete' className="btn btn-lg btn-block" type='button' >Delete</button>
         <button onClick={this.handleTemplateMenu} id='close' className="btn btn-lg btn-block" type='button' >Close</button>
         </div>
       </CSSTransition>
      )
    } else{
      return(            
        <CSSTransition 
            classNames="example"
            in={this.state.show}>
            <div key={i}>
            </div>
        </CSSTransition>)
    }
  }

  createRegimen(){
    this.setState({
      creatingRegimen: true
    })
  }

  finishedRegimen(obj){
    console.log('what is this regimen', obj)
    this.setState({
      creatingRegimen: false
    })
  }

  finishedTemplate(obj){
    this.setState({
      creatingTemplate: false,
      plans: this.state.plans.concat(obj)
    })
  }

  render() {
    console.log(this.state)
    if(this.state.creatingTemplate){
      return(
        <div>
          <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
          <Template save={this.finishedTemplate} />
        </div>)
    } else if(this.state.creatingRegimen){
      return(
      <Regimen finished={this.finishedRegimen} />)
    }else{
      return(
        <div style={{flexDirection:'Column'}}>
        <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
        <div>
        {this.state.plans.map((val, key) =>{
          return(
            <div>
            <div className="card" key={key} onClick={() => this.divClick(key)}style={{width: "12rem", maxheight:'20rem', padding:'10px', float:'left', cursor:'pointer'}}>
              <img className="card-img-top" src={val.regimen.photo} alt="Card image cap" />
              <div className="card-block">
                    {this.popOutMenu(key)}
                <h4 className="card-title">{val.name}</h4>
                <p className="card-text">{val.regimen.description}</p>
              </div>
            </div>
            </div>
          )
        }
        )}
        </div>
          <button onClick={() => {this.createTemplate()}} className="btn btn-lg btn-block" type='button' >Create a new Template</button>
          <button onClick={() => {this.createRegimen()}} className="btn btn-lg btn-block" type='button' >Create a new Regimen</button>
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
    plans: store.auth.Exercise_Plan
  };
};

export default withRouter(connect(
  mapStoreToProps
)(WorkoutPlans));