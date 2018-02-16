import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import { Grid, Image, Button, Modal, Container, Card, Icon } from 'semantic-ui-react'
import SelectedClient from './selectedClient.jsx'

const s3 = require('../../../utilities/s3_utilities.js');

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

  grabProfilePic(client) {
    if ( client.profile_data && JSON.parse(client.profile_data).profilePictureURL ) {
      return JSON.parse(client.profile_data).profilePictureURL;
    } else {
      return undefined;
    }
  }

  grabPhotos(client) {
    let fixedList = [];

    s3.getPhotosList(client.id).then((list) => {
      console.log('list: ', list);
      let l = _.pluck(list, 'key');
      console.log('l is: ', l);
      l.splice(l.indexOf(client.id+'/'), 1);
      console.log('now l is: ', l);
      l.forEach(url => {
        // get rid of the id/ at beginning of string
        let t = url.split('/');

        // splice out and store the timestamp at end of string separately
        let v = t[1].split('TIMESTAMP=');
        console.log('timestamp: ', v[1]);

        // replace the single quote with a forward slash
        let s = v[0].split("'").join('/');

        let u = "http://res.cloudinary.com/dvhehr6k8/image/upload/" + s;

        fixedList.push([u, v[1]]);
      });
    }).then(() => {
      // do something with fixedList to display current client's progress photos
      // this.setState({})
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
    <Grid.Column center={true} style={{textAlign:'center'}}>
    {firstHalf.map((val, key) => {
      console.log('profile url: ', this.grabProfilePic(val.client));
        return (<Grid.Row style={{padding:'20px'}}>
          <Card onClick={this.selectClient}>
        <Card.Content>
          <Card.Header>
          {val[0]}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Athlete
            </span>
          </Card.Meta>
          <Card.Description>
            Your CLient
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
       <Icon name='user' />
          </a>
        </Card.Content>
      </Card>
          </Grid.Row>
          )
      })}
    </Grid.Column>

    <Grid.Column center={true} style={{textAlign:'center'}}>
    {secondHalf.map((val, key) => {
        return (<Grid.Row style={{padding:'20px'}}>
          <Card onClick={this.selectClient}>
        <Card.Content>
          <Card.Header>
          {val[0]}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Athlete
            </span>
          </Card.Meta>
          <Card.Description>
            Your CLient
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
       <Icon name='user' />
          </a>
        </Card.Content>
      </Card>
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