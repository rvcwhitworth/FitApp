import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import { Grid, Image, Button } from 'semantic-ui-react'


class Roster extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null,
        backgroundImage: this.props.backgroundImage,
        roster: this.props.roster
      }
  }

  componentWillReceiveProps(nextProps) {
  }

  testing(){
    console.log('i can click')
  }

  render() {
    var point = Math.ceil(this.state.roster.length/2)
    var firstHalf = this.state.roster.slice(0, point)
    var secondHalf = this.state.roster.slice(point)

      return(
        
        <Grid columns={2} divided>
    <Grid.Column style={{textAlign:'center'}}>
    {firstHalf.map((val, key) => {
        return (<Grid.Row style={{padding:'20px'}}>
          <Button fluid primary onClick={this.selectClient} >{val.client.fullName}</Button>
          </Grid.Row>
          )
      })}
    </Grid.Column>

    <Grid.Column style={{textAlign:'center'}}>
    {secondHalf.map((val, key) => {
        return (<Grid.Row style={{padding:'20px'}}>
          <Button fluid primary onClick={this.selectClient} >{val.client.fullName}</Button>
          </Grid.Row>
          )
      })}
    </Grid.Column>
  </Grid>
        )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
    goals: store.auth.goals,
    roster: store.auth.spotters,
    backgroundImage: store.branding.backgroundImg,
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Roster));

