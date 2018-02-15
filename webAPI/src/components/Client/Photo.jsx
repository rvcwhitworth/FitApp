import React from 'react';
import ReactDOM from 'react-dom';
let moment = require('moment');
import {Card, Icon, Image} from 'semantic-ui-react'

class Photo extends React.Component{
  // this component takes a URL and timestamp via props
  // to render the image and timestamp in the photo gallery
  constructor(props) {
    console.log('in photo component.');
    super(props);
  }

  render() {
    return (
      <Card
        image={this.props.url}
        header='Elliot Baker'
        meta='Friend'
        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        extra={extra}
      />
      );
  }
}

export default Photo;
{}