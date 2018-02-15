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
      <Grid  style={{backgroundColor: "white", margin: 0, marginTop:'10'}} columns={1} centered>
        <Grid.Row style={{height:'30vh'}}>
          <div style={{textAlign: 'center', width:'80%', lineHeight:'1.8'}}>
            <h1>Fit Hero</h1>
            <p style={{lineHeight:'1.8'}}>
              FitHero is a platform to connect athletes with professional trainer, to cut the problem of distance and every other knwon inconvience to provide a seamless connection. Fit Hero keeps tracks of your daily workout and diet and 
              keeps your trainer update with smooth real time chat, newsfeed, and synchronized data to provide you with the best workout regimen tailored to your progess and goals. It also provides a frame work to create and design custom workout
              regimens based on personal goal and targets.
            </p>          
          </div>
          
        </Grid.Row>

        <Grid.Row style={{height:'30vh', backgroundColor: 'black'}}>
          
        </Grid.Row>
        <Grid.Row style={{height:'25vh'}}>
          
        </Grid.Row>

      </Grid>
    </div>
  )
}

export default about
