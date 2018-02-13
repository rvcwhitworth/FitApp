import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';

class Photo extends React.Component{
  // this component takes a base64 string and timestamp via props
  // to render the image and timestamp in the photo gallery
  constructor(props) {
    console.log('in photo component.');
    super(props);
  }

  render() {
    return <div> This is your photo component! </div>
  }
}

const mapStoreToProps = (store) => {
  console.log('photo store: ', store);
  return {}
}

export default withRouter(connect(
  mapStoreToProps
)(Photo));