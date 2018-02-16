import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import Photo from './Photo.jsx';
import {Grid, Card, Image} from 'semantic-ui-react';
let moment = require('moment');

class Photos extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        photos: [] // [[URL1, timestamp1],[URL2, timestamp2], ...]
      }
  }

  componentDidMount() {
    // sort photos by timestamp:
    let p = this.props.photos;
    p = p.sort((a, b) => {
      return a[1] < b[1];
    });
    this.setState({photos: p}, () => {
      console.log('set photos state: ', this.state.photos);
    });
  }

  render() {
    let l = this.state.photos.length;
    let rowLength = Math.floor(l / 3);
    // render grid with 3 columns - split this.state.photos into 3 groups
    console.log('rowLength: ', rowLength);
    let a = this.state.photos.slice(0, rowLength);
    let b = this.state.photos.slice(rowLength, rowLength * 2);
    let c = this.state.photos.slice(rowLength * 2, this.state.photos.length);
    console.log('number of pics per row: ', a.length, b.length, c.length);
    return (
      <Grid columns={3}>
          <Grid.Row>
            {a.map((photo, i) => {
              return <Grid.Column style={{"borderWidth": "2px", "borderColor": "green"}}>
                <Card>
                  <Image src={photo[0]} style={{"transform":"rotate(90deg)"}}/>
                  <Card.Content>
                    <Card.Header>{moment(parseInt(photo[1])).format('LLLL')}</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            })}
          </Grid.Row>
          <Grid.Row>
            {b.map((photo, i) => {
              return <Grid.Column>
                <Card>
                  <Image src={photo[0]} style={{"transform":"rotate(90deg)"}}/>
                  <Card.Content>
                    <Card.Header>{moment(parseInt(photo[1])).format('LLLL')}</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            })}
          </Grid.Row>
          <Grid.Row>
            {c.map((photo, i) => {
              return <Grid.Column>
                <Card
                  image={photo[0]}
                  header={moment(parseInt(photo[1])).format('LLLL')}
                />
              </Grid.Column>
            })}
          </Grid.Row>
      </Grid>
    );
      
  }
}

const mapStoreToProps = (store) => {
  console.log('the store is: ', store.auth);
  return {
    id: store.auth.id,
    photos: store.auth.photoKeys
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Photos));