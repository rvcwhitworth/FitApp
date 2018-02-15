import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import { Grid, Image, Button, Modal, Container } from 'semantic-ui-react'
import SelectedClient from './selectedClient.jsx'



class Roster extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null,
        backgroundImage: this.props.backgroundImage,
        roster: this.cleanRoster(),
        selectedClient: '',
        viewingClient: false
      }
      this.cleanRoster = this.cleanRoster.bind(this)
      this.selectClient = this.selectClient.bind(this)
      this.cancel = this.cancel.bind(this)
  }

    cleanRoster(){
    let check = []
    let arr = []
    this.props.roster.map((val) => {
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

  selectClient(val){
    console.log(val)
    this.setState({
      viewingClient: true,
      selectedClient: val[0]
    })
  }

  cancel(){
    this.setState({
      viewingClient: false,
      selectedClient: ''
    })
  }

  render() {
    var point = Math.ceil(this.state.roster.length/2)
    var firstHalf = this.state.roster.slice(0, point)
    var secondHalf = this.state.roster.slice(point)
      return(
        <Container>
        <Modal open={this.state.viewingClient} style={{height:'100%'}}>
          <Modal.Header></Modal.Header>
          <Modal.Content>
          <SelectedClient selected={this.state.selectedClient} cancel={this.cancel}/>
          </Modal.Content>
       </Modal>
        <Grid columns={2} divided>
    <Grid.Column style={{textAlign:'center'}}>
    {firstHalf.map((val, key) => {
        return (<Grid.Row style={{padding:'20px'}}>
          <Button fluid primary onClick={() => this.selectClient(val)} >{val[0]}</Button>
          </Grid.Row>
          )
      })}
    </Grid.Column>

    <Grid.Column style={{textAlign:'center'}}>
    {secondHalf.map((val, key) => {
        return (<Grid.Row style={{padding:'20px'}}>
          <Button fluid primary onClick={() => this.selectClient(val)} >{val[0]}</Button>
          </Grid.Row>
          )
      })}
    </Grid.Column>
  </Grid>
  </Container>
        )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.id,
    user: store.auth.username,
    goals: store.auth.goals,
    roster: store.auth.spotters,
    backgroundImage: store.branding.backgroundImg,
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Roster));

