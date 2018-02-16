import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Image } from 'semantic-ui-react'
const moment = require('moment');

class ProgressPhotos extends React.Component {
	constructor(props){
		console.log('progressphotos props: ', props);
		super(props);
	}

	render() {
		return (
			<div style={{"overflow":"scroll"}}>
				{this.props.pictures.map((photo, i) => {
					// each photo is a tuple: [url, timestamp]
					return (
						<Card style={{"transform":"rotate(90deg)", margin: "200px auto", width: "500px"}}>
							<Card.Content>
								<Image src={photo[0]} key={i}/>
							</Card.Content>
							<Card.Header>{moment(parseInt(photo[1])).format('LL')}</Card.Header>
						</Card>
						)
				})}
			</div>
			)
	}
}
export default ProgressPhotos;

// <div style={{"transform":"rotate(270deg)"}}>{moment(parseInt(photo[1])).format('LLLL')}</div>
