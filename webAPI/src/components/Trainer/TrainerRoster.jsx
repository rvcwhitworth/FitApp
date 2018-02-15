import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import { Grid, Image, Button } from 'semantic-ui-react'
const s3 = require('../../../utilities/s3_utilities.js');

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
        
        <Grid columns={2} divided>
    <Grid.Column style={{textAlign:'center'}}>
    {firstHalf.map((val, key) => {
      console.log('profile url: ', this.grabProfilePic(val.client));
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

