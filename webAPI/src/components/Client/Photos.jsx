import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import Photo from './Photo.jsx';
import {Grid} from 'semantic-ui-react';

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
    this.setState({photos: this.props.photos}, () => {
      console.log('set photos state: ', this.state.photos);
    });
    // this.props.photos.forEach((key) => {
    //   console.log('key to download: ', key);
    //   // axios.get('https://fitpics.s3.amazonaws.com/public/' + key).then(({data}) => {
    //   //   // 
    //   //   console.log('base64 for key ' + key + ': ', data);
    //   // }).catch((err) => {
    //   //   console.log('s3 error: ', err);
    //   // })
    // });
  }

  render() {
    return (
      <Grid columns={3}>
        {this.state.photos.map((photo, i) => {
          return <Photo key={i} url={photo[0]} timestamp={photo[1]} />
        })}
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