import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './logIn.jsx';
import { Dropdown, Grid, Item, Image, Menu, Segment, Form,Icon, Button, Header, Modal } from 'semantic-ui-react'


const about = function(props){
  return (
    <div>
      <LogIn/>
      <div style={{backgroundColor: 'white', height: '15vh', marginTop: 0}}>
      </div>
      <Grid centered style={{backgroundColor: "white", margin: 0, marginTop:'10'}} columns={2} >
        <Grid.Row style={{height:'40vh'}}>
          <Grid.Column >
          <Icon name='comments outline' size='huge'/>
          </Grid.Column>
          <Grid.Column >
            <span>The importance of staying organized and scheduling your workouts in advance cannot be stressed enough. By creating a daily and weekly schedule, you keep yourself motivated, stay focused and are in a better position to determine goals and measure your results. 
              When people are successful in an aerobic training program, one of the primary reasons is that they used a daily and weekly schedule to plan their success.</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{height:'40vh'}}>
          <Grid.Column >
            <span>The importance of staying organized and scheduling your workouts in advance cannot be stressed enough. By creating a daily and weekly schedule, you keep yourself motivated, stay focused and are in a better position to determine goals and measure your results. 
              When people are successful in an aerobic training program, one of the primary reasons is that they used a daily and weekly schedule to plan their success.</span>
          </Grid.Column>
          <Grid.Column >
          <Icon name='comments outline' size='huge'/>
          </Grid.Column>
          
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default about