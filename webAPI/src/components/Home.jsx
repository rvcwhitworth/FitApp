import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './logIn.jsx';
import { Dropdown, Grid, Item, Image, Menu, Segment, Form,Icon, Button, Header, Modal } from 'semantic-ui-react'

const Home = function(props){
  return (
    <div>
        <LogIn/>
        <div style={{background: 'url("http://gettheshot.ca/images/hero/Mark-Whitehead-Photography-Get-The-Shot-Studios-4.jpg") center', backgroundSize: 'cover', height: '85vh', marginTop: 0}}>
                    {/* ?<Image src='http://gettheshot.ca/images/hero/Mark-Whitehead-Photography-Get-The-Shot-Studios-4.jpg' centered style={{margin: '-10' ,width: '100%', height: '100%', opacity: 0.7}} /> */}
        </div>
        <div>
        {/* Info Blurb */}
            <Grid centered style={{backgroundColor: "white", marginTop:'10', padding:'3%', height: 'auto'}} columns={2} >
                <Grid.Row style={{ margin:'3%'}}>
                    <Grid.Column >
                        <Icon name='comments outline' size='huge'/>
                    </Grid.Column>
                    <Grid.Column style={{lineHeight: '2.2'}}>
                        <div>The importance of staying organized and scheduling your workouts in advance cannot be stressed enough. By creating a daily and weekly schedule, you keep yourself motivated, stay focused and are in a better position to determine goals and measure your results. 
                        When people are successful in an training program, one of the primary reasons is that they used a daily and weekly schedule to plan their success.</div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ margin:'3%'}}>
                    <Grid.Column style={{lineHeight: '2.2'}}>
                        <div >Having a personal trainer to guide you through your fitness routine will help make sure you are spending time on the proper types of exercise.  
                        If you only have a limited amount of time to work out, a personal trainer will make sure you get the best results possible for the amount of time that you put it.
                        A personal trainer will teach you the proper form and technique to use during your workout so you can stay safe and injury-free.
                        When you hit a plateau in your exercise routine, it can be hard to push through and stay motivated.  A personal trainer can help you understand why you hit a plateau 
                        and find ways for you to work through it and see more results.</div>
                    </Grid.Column>
                    <Grid.Column >
                        <Icon name='comments outline' size='huge'/>
                    </Grid.Column>
                </Grid.Row>
                
                <Grid.Row style={{ margin:'3%'}}>
                    <Grid.Column >
                        <Icon name='comments outline' size='huge'/>
                    </Grid.Column>
                    <Grid.Column style={{lineHeight: '2.2'}}>
                        <div>The importance of staying organized and scheduling your workouts in advance cannot be stressed enough. By creating a daily and weekly schedule, you keep yourself motivated, stay focused and are in a better position to determine goals and measure your results. 
                        When people are successful in an training program, one of the primary reasons is that they used a daily and weekly schedule to plan their success.</div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

{/* 1. FASTER AND BETTER RESULTS
Having a personal trainer to guide you through your fitness routine will help make sure you are spending time on the proper types of exercise.  
If you only have a limited amount of time to work out, a personal trainer will make sure you get the best results possible for the amount of time that you put it.
A personal trainer will teach you the proper form and technique to use during your workout so you can stay safe and injury-free.
When you hit a plateau in your exercise routine, it can be hard to push through and stay motivated.  A personal trainer can help you understand why you hit a plateau 
and find ways for you to work through it and see more results.

2. PROPER FAT LOSS AND MUSCLE GAIN
Most people have multiple goals when working out, the most common being fat loss and muscle gain.  It’s often hard to find the right balance between these two, 
and a personal trainer can help you find the right exercises to achieve all of your goals.

3. REDUCED CHANCE OF INJURY
A personal trainer will teach you the proper form and technique to use during your workout so you can stay safe and injury-free.

4. ESTABLISHES A LIFETIME EXERCISE HABIT
A personal trainer can help you find ways to make healthy living and exercise a priority in your life.  They can help you overcome obstacles that might prevent you 
from exercising, and help you set many small, achievable goals.

5. OVERCOME PLATEAUS
When you hit a plateau in your exercise routine, it can be hard to push through and stay motivated.  A personal trainer can help you understand why you hit a plateau 
and find ways for you to work through it and see more results. */}

            {/* <Grid style={{backgroundColor: "#06D6A0", margin: 0, marginTop:'10'}} columns={4} >
                <Grid.Row centered>
                    <Grid.Column >
                    <Icon name='comments outline' size='huge'/>
                    <span>Talk Live With Trainers</span>
                    </Grid.Column>
                    <Grid.Column >
                    <Icon name='line chart' size='huge' />
                    <span>Record Track and View Graphed Analysis of Workouts and Diet</span>
                    </Grid.Column >
                </Grid.Row>

                <Grid.Row centered>
                    <Grid.Column centered>
                    <Icon name='calendar' size='huge' />
                    <span>Structured Workout Regimen</span>
                    </Grid.Column>
                    <Grid.Column centered>
                    <Icon name='user plus' size='huge' />
                    <span>Find Real Professional Trainers</span>
                    </Grid.Column>
                </Grid.Row>
            </Grid> */}
        </div>
    

    </div>
    )}
export default Home
