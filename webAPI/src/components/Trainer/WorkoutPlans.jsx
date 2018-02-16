import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import { Button, Card, Icon, Image, Segment, Divider, Container, Modal, Header} from 'semantic-ui-react'
import AddTemplate from '../../actions/addTemplate.jsx'
import Template from './WorkoutTemplate.jsx'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Regimen from './RegimenCreation.jsx'
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import { createExercisePlan } from '../../../utilities/mutations.jsx'
import SendToClient from './SendToClient.jsx'
// import Styles from '../../www/ReactCSSAnimation.css'

class WorkoutPlans extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        creatingTemplate: false,
        backgroundImage: this.props.backgroundImage,
        plans: this.cleanPlans(),
        popOut: null,
        show: false,
        sendIT: false
      }
      this.createTemplate = this.createTemplate.bind(this)
      this.finishedTemplate = this.finishedTemplate.bind(this)
      this.popOutMenu = this.popOutMenu.bind(this)
      this.handleTemplateMenu = this.handleTemplateMenu.bind(this)
      this.createRegimen = this.createRegimen.bind(this)
      this.finishedRegimen = this.finishedRegimen.bind(this)
      this.cancelTemplate = this.cancelTemplate.bind(this)
      this.goBack = this.goBack.bind(this)
      this.cleanPlans = this.cleanPlans.bind(this)
      this.cancelRegimen = this.cancelRegimen.bind(this)
  }

  componentDidMount() {
    //here is where we will query??? or should we pull from redux that hopefully loaded everything
  }

  cleanPlans(){
    var clean = []
    this.props.plans.map((val) => {
      if(val.client.id === val.trainer.id){
        clean.push(val)
      }
    })
    return clean
  }

  createTemplate(e){
    this.setState({
      creatingTemplate: true
    })
  }

  divClick(i){
    console.log('what is love?', this.state)
    if(i !== this.state.popOut && this.state.show){
    this.setState({
      show: !this.state.show
    }, () =>{
      setTimeout(()=>{
        this.setState({
          popOut: i,
          show:!this.state.show
        })
      }, 500)
    })} else if(i !== this.state.popOut && !this.state.show){
      this.setState({
        popOut: i,
        show: !this.state.show
      })
    } else if(i === this.state.popOut){
      this.setState({
        show: !this.state.show
      }, () => {
        setTimeout(() =>{this.setState({
          popOut: null
        })}, 500)
      })
    }
  }

  handleTemplateMenu(e){
    console.log('please be here', e.target, e.relatedTarget)
    if(e.target.id === 'close'){
      // this.setState({
      //   
      // }, () => {
        this.setState({
          show:false,
        })
      // })
    } else if(e.target.id === 'SendToClient'){
      this.setState({
        sendIT: true,
        show: false
      })
    }
    else{
      console.log('What did you click?', e.target.id)
    }
  }

  popOutMenu(i) {
    if(this.state.popOut === i){
      return (
        <CSSTransition 
          classNames="example"
          in={this.state.show}
          style={{zIndex:5}}
          >
        <Button.Group vertical>
         <Button onClick={this.handleTemplateMenu} id='View/Edit' >View/Edit</Button>
         <Button onClick={this.handleTemplateMenu} id='SendToClient' >Send to a client</Button>
         <Button onClick={this.handleTemplateMenu} id='Delete' >Delete</Button>
         <Button onClick={this.handleTemplateMenu} id='close' >Close</Button>
       </Button.Group>
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

  cancelRegimen(){
    this.setState({
      creatingRegimen: false
    })
  }

  finishedRegimen(obj){
    console.log('what is this regimen', obj)
    this.setState({
      creatingRegimen: false
    })
    var payload = {
      regimen: {
        monday: obj.monday,
        tuesday: obj.tuesday,
        wednesday: obj.wednesday,
        thursday: obj.thursday,
        friday: obj.friday,
        saturday: obj.saturday,
        sunday: obj.sunday,
        name: obj.RegimenName,
        description: obj.RegimenDescription },
      name: obj.RegimenName,
      type: 'Regimen',
      creator: this.state.username
    }

    this.props.dispatch(AddTemplate(payload))
    this.props.client.mutate({
      mutation: createExercisePlan,
      variables: {
        name: payload.name,
        regimen: JSON.stringify(payload),
        trainer_id: this.state.id,
        client_id: this.state.id
      }
    }).then( (...args) => {
      console.log('hey it worked', ...args)
      this.finishedTemplate(payload)
    })
  }

  finishedTemplate(obj){
    this.setState({
      creatingTemplate: false,
      plans: this.state.plans.concat(obj)
    })
  }

  goBack(){
    console.log('are we going back???')
    this.setState({
      popOut: null,
      creatingTemplate: false,
      show: false,
      sendIT: false
    })
  }

  cancelTemplate(){
    this.setState({
      creatingTemplate:false
    })
  }

  render() {
    console.log(this.state)

    if(this.state.creatingTemplate){
      return(
        <div>
          <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
          <Template save={this.finishedTemplate} cancel={this.cancelTemplate} />
        </div>)
    } else if(this.state.creatingRegimen){
      return(
      <Regimen save={this.finishedRegimen} cancel={this.cancelRegimen} />)
    }else{
      return(
        <div style={{flexDirection:'Column', height:'100%' }}>
        <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
        <Container fluid>
          <Modal open={this.state.sendIT} style={{height:'100%'}}>
          <Modal.Header>Select a Client</Modal.Header>
          <Modal.Content>
          <SendToClient workout={this.state.plans[this.state.popOut]} goBack={this.goBack}/>
          </Modal.Content>
       </Modal>
        {this.state.plans.map((val, key) =>{
          if(key === this.state.popOut){
            var z = 2
          } else{
            var z = 1
          }
          return(
            <Card key={key} onClick={() => this.divClick(key)}style={{width: "12rem", height:'15rem', padding:'10px', float:'left', cursor:'pointer', zIndex:z}}>
              {/*<Image src={val.regimen.photo} alt="Card image cap" />*/}
              <Card.Content>
              <Card.Header>
              {val.name}
              </Card.Header>
              <Card.Meta>
              <span className='workout'>
                 {val.regimen.type || 'Workout'}
              </span>
              </Card.Meta>
              <Card.Description>
                {val.regimen.description}
              </Card.Description>
                    {this.popOutMenu(key)}
              </Card.Content>
              <Card.Content extra>
             <a>
             Difficulty 5
             <Icon name='star' />
             </a>
             </Card.Content>
             </Card>
          )
        }
        )}
        </Container>
         <Container fluid stlye={{position: 'fixed', bottom:0}}>
          <Segment padded>
            <Button style={{backgroundColor:'#06D6A0'}}fluid onClick={() => {this.createTemplate()}}>Create a new Workout</Button>
            <Divider horizontal>Or</Divider>
            <Button style={{backgroundColor:'#FFD166'}} fluid onClick={() => {this.createRegimen()}}>Create a new Regimen</Button>
         </Segment>
        </Container>
        </div>)
    }
  }
}





const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.id,
    user: store.auth.fullName,
    backgroundImage: store.branding.backgroundImg,
    plans: store.auth.Exercise_Plan
  };
};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(WorkoutPlans)));