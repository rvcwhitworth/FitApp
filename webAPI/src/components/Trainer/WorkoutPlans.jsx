import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import { Button, Card, Icon, Image, Segment, Divider, Container} from 'semantic-ui-react'
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
      this.cancelTemplate = this.cancelTemplate.bind(this)
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
    if(e.target.id === 'close'){
      // this.setState({
      //   
      // }, () => {
        this.setState({
          show:false,
        })
      // })
    } else{
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
      <Regimen finished={this.finishedRegimen} />)
    }else{
      return(
        <div style={{flexDirection:'Column', height:'100%' }}>
        <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
        <Container fluid>
        {this.state.plans.map((val, key) =>{
          if(key === this.state.popOut){
            var z = 2
          } else{
            var z = 1
          }
          return(
            <Card key={key} onClick={() => this.divClick(key)}style={{width: "12rem", height:'15rem', padding:'10px', float:'left', cursor:'pointer', zIndex:z}}>
              <Image src={val.regimen.photo} alt="Card image cap" />
              <Card.Content>
              <Card.Header>
              {val.name}
              </Card.Header>
              <Card.Meta>
              <span className='workout'>
                 Workout
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
    id: store.auth.auth,
    user: store.auth.username,
    backgroundImage: store.branding.backgroundImg,
    plans: store.auth.Exercise_Plan
  };
};

export default withRouter(connect(
  mapStoreToProps
)(WorkoutPlans));