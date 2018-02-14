import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './logIn.jsx';
import { Dropdown, Grid, Item, Image, Menu, Segment, Form,Icon, Button, Header, Modal } from 'semantic-ui-react'


const contact = function(props){
  return (
    <div>
    <LogIn/>
    <div style={{backgroundColor: 'white', height: '15vh', marginTop: 0}}>
    </div>
    <Grid style={{backgroundColor: "white", margin: 0, marginTop:'10'}} columns={4} >
      <Grid.Column >
        <Icon name='comments outline' size='huge'/>
        <span>Talk Live With Trainers</span>
      </Grid.Column>
      <Grid.Column >
        <Icon name='line chart' size='huge' />
        <span>Record Track and View Graphed Analysis of Workouts and Diet</span>
      </Grid.Column >
    </Grid>
</div>
  )
}

export default contact