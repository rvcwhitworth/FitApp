import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import { Button, Card, Icon, Image, Segment, Divider, Container} from 'semantic-ui-react'
import { createExercisePlan } from '../../../utilities/mutations.jsx'

class SendToClient extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        workout: this.props.workout,
        id: this.props.id,
        user: this.props.user,
        spotters: this.props.spotters,
        roster: this.cleanRoster(),
        selectedUsers: []
      }
      this.cleanRoster = this.cleanRoster.bind(this)
      this.selectUser = this.selectUser.bind(this)
      this.sendWorkoutsToUsers = this.sendWorkoutsToUsers.bind(this)
  }

  componentWillReceiveProps(nextProps) {
  }

  cleanRoster(){
    let check = []
    let arr = []
    this.props.spotters.map((val) => {
      if(val.trainer.id !== this.props.id){
        if(check.indexOf(val.trainer.fullName) === -1){
          arr.push([val.trainer.fullName, val.trainer.id])
          check.push(val.trainer.fullName)
        }
      }
      if(val.client.id !== this.props.id){
        if(check.indexOf(val.client.fullName) === -1){
          arr.push([val.client.fullName, val.client.id])
          check.push(val.client.fullName)
        }
      }      
    })
    return arr
  }

  sendWorkoutsToUsers(){
    if(this.state.selectedUsers.length === 0){
      alert('No Clients Selected!')
      return
    } else{
    this.state.selectedUsers.map((val)=>{
      this.props.client.mutate({
      mutation: createExercisePlan,
      variables: {
        name: this.state.workout.name,
        regimen: JSON.stringify(this.state.workout),
        trainer_id: this.state.id,
        client_id: val[1]
      }
    }).then((...args) => console.log('hey it worked', ...args))
        }) 
      }
      this.props.goBack()
  }

  selectUser(id){
    console.log('what are we clicking', id)
    this.setState({
      selectedUsers: this.state.selectedUsers.concat([this.state.roster[id]])
    })
  }

render() {
  console.log('gimme dat state', this.state, this.props)
  let val = this.state.workout
      return(
        <Container>
        <Container>
        <Card style={{width: "12rem", height:'15rem', padding:'10px', float:'right', cursor:'pointer'}}>
              {/*<Image src={val.regimen.photo} alt="Card image cap" />*/}
              <Card.Content>
              <Card.Header>
              {val.name}
              </Card.Header>
              <Card.Meta>
              <span className='workout'>
                 {val.type || 'Workout'}
              </span>
              </Card.Meta>
              <Card.Description>
                {val.regimen.description}
              </Card.Description>
              </Card.Content>
              <Card.Content extra>
             <a>
             Difficulty 5
             <Icon name='star' />
             </a>
             </Card.Content>
             </Card>
        </Container>

        {this.state.roster.map((val, key)=>{
          if(this.state.selectedUsers.toString().indexOf(val.toString()) > -1){
            var border = 'solid 5px #06D6A0'
          } else{
            var border = 'null'
          }
          return (
            <Container style={{width: "12rem", height:'15rem', padding:'5px', float:'left', cursor:'pointer'}}>
              <Card
              onClick={() => {this.selectUser(key)}}
              style={{border: border}}
              >
              {/*<Image src={val.regimen.photo} alt="Card image cap" />*/}
              <Card.Content>
              <Card.Header>
              {val[0]}
              </Card.Header>
              <Card.Meta>
              <span className='workout'>
                 Client
              </span>
              </Card.Meta>
              <Card.Description>
              </Card.Description>
              </Card.Content>
              <Card.Content extra>
             <a>
             <Icon name='person' />
             </a>
             </Card.Content>
             </Card>
          </Container>
            )
        })}

        <Button style={{backgroundColor:'#06D6A0', bottom:'0'}}fluid onClick={this.sendWorkoutsToUsers}>Send It!</Button>
        <Button style={{backgroundColor:'#FFD166', bottom:'0'}}fluid onClick={this.props.goBack} >Cancel</Button>
        </Container>
      )
    }

  }

const mapStoreToProps = (store) => {
  console.log('TrainerProfileStore', store);
  return {
    id: store.auth.id,
    user: store.auth.fullName,
    goals: store.auth.goals,
    spotters: store.auth.spotters
  };
};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(SendToClient)));