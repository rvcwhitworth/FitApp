import React from 'react'
import { ProgressCircle }  from 'react-native-svg-charts'


export default class ProgressCircleExample extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <ProgressCircle
                style={ { height: 30 } }
                progress={this.props.progress}
                progressColor={'rgb(134, 65, 244)'}
            />
        )
    }
}
