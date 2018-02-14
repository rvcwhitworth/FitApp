import React from 'react';
import ReactDOM from 'react-dom';

class Photo extends React.Component{
  // this component takes a URL and timestamp via props
  // to render the image and timestamp in the photo gallery
  constructor(props) {
    console.log('in photo component.');
    super(props);
  }

  render() {
    return (
      <div style={{"transform": "rotate(90deg)"}}> 
        <img className="ui image" src={this.props.url}></img>
        <span>{this.props.timestamp} </span>
      </div>
      );
  }
}

export default Photo;