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
                        <Image src='https://nrf.com/sites/default/files/Images/Resources/4-5-4%20Calendar-2.jpg' centered size='medium'/>                        
                    </Grid.Column>
                    <Grid.Column >
                        <div>
                            <h3>Structured Workout Regimen</h3>
                            <p style={{lineHeight: '2.2'}}>The importance of staying organized and scheduling your workouts in advance cannot be stressed enough. By creating a daily and weekly schedule, you keep yourself motivated, stay focused and are in a better position to determine goals and measure your results. 
                            When people are successful in an training program, one of the primary reasons is that they used a daily and weekly schedule to plan their success.</p>
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ margin:'3%'}}>
                    <Grid.Column style={{lineHeight: '2.2'}} >
                        <div >
                            <h3>Certified Professional Trainers</h3>
                                
                            <p style={{lineHeight: '2.2'}}>Having a personal trainer to guide you through your fitness routine will help make sure you are spending time on the proper types of exercise.  
                            If you only have a limited amount of time to work out, a personal trainer will make sure you get the best results possible for the amount of time that you put it.
                            A personal trainer will teach you the proper form and technique to use during your workout so you can stay safe and injury-free.
                            When you hit a plateau in your exercise routine, it can be hard to push through and stay motivated.  A personal trainer can help you understand why you hit a plateau 
                            and find ways for you to work through it and see more results.</p>
                        </div>
                    </Grid.Column>
                    <Grid.Column >
                        {/* <Icon name='comments outline' size='huge'/> */}
                        <Image src='http://static.wixstatic.com/media/f2aa3c_89e1ca5fc0594767a1cb4fff86dd6191.gif' centered size='medium'/>
                    </Grid.Column>
                </Grid.Row>
                
            </Grid>
            <Grid columns={3} style={{padding: '3%', backgroundColor: '#06d499'}}>
                <Grid.Row >
                    <Grid.Column style={{textAlign: 'center'}}>
                        <Icon name='comments outline' size='huge' style={{color:'black'}} />
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center'}}>
                        <Icon name='area graph' size='huge' style={{color:'black'}}/>
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center'}}>
                        <Icon name='user' size='huge' style={{color:'black'}}/>
                    </Grid.Column>
                        
                </Grid.Row>

                <Grid.Row  >
                    <Grid.Column style={{textAlign: 'center', color:'white'}}>
                        <h3>Communication</h3>
                        <div>
                            Direct & Instant Communcation With Support Group Trainers
                        </div>
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center', color:'white'}}>
                        <h3>Analytics</h3>
                        <div>
                            Workout and diet data is automatically synchronized creating analyized visual data of your progress!
                        </div>
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center', color:'white'}}>
                        <h3>Professional Trainers</h3>
                        <div>
                            Personal fitness trainers work with a single client or a small group. Personal fitness trainers assess the clients' level of physical fitness and help them set and reach their fitness goals.
                        </div>
                    </Grid.Column>
                        
                </Grid.Row>
            </Grid>

            <Grid columns={2} style={{padding:'2%', backgroundColor: 'white'}}>
                <Grid.Row style={{padding:'2%'}}>
                    <Grid.Column style={{textAlign: 'center'}}>
                        <Image src='https://media-exp2.licdn.com/media/AAMABADuAAgAAQAAAAAAAA62AAAAJDgzNjFjZGY4LWM3MDAtNGYwNy04ZWMzLWI2NGVkMWZhNWI2Mg.bin' centered size='small' avatar/>
                        <div>
                            <h3>Jason McCuthan</h3>
                            <p style={{color: '#868e96', fontSize:'14px'}}>Jason McCutchan is a Software Developer with FullStack Application Experience. He has Mentored and educated students in vanilla Javascript, Node, Angular, React, Redux and various other libraries and frameworks. Also conducted lectures and interviews relating to JS fundamentals and Machine Learning.</p>
                        </div>
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center'}}>
                        <Image src='https://media-exp2.licdn.com/media/AAMABADuAAgAAQAAAAAAAA3rAAAAJDkxMWIwMDJhLTRhZjUtNDQ5Yi04MDYwLTM3ZjNhZGUwMTNiMg.bin' centered size='small' avatar/>
                        <div>
                            <h3>Ryan Whitworth</h3>
                            <p style={{color: '#868e96', fontSize:'14px'}}>
                                Ryan Whitworth is a Software Engineer with Fullstack Development Experience in both Mobile and Web Applications.
                                He is a gift from god and will fix your code before he breaks your heart.
                            </p>
                            </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{padding:'2%'}} >
                    <Grid.Column style={{textAlign: 'center'}}>
                        <Image src='https://media.licdn.com/media/AAMABADuAAgAAQAAAAAAAA-8AAAAJDliNGE2NDlhLWYzYzItNDcyZS1hODQ1LTUxZDU1YWQ5MzAxNg.bin' centered size='small' avatar/>
                        <div>
                            <h3>Ethan Lipkind</h3>
                            <p style={{color: '#868e96', fontSize:'14px'}}>Ethan has constructed APIs using GraphQL to improve runtime of queries and provide easy access to backend via a single endpoint, He has designed custom components using React Native with Flexbox for layout and AWS S3 buckets for storage. He is a backend wiz using SQL, KNEX, and Bookshelf.js to manage relational user data. 
                            He worked with React Native, Javascript, SQL, GraphQL, Node, Express, AWS. </p>
                            
                        </div>                        
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center'}}>
                        <Image src='https://avatars1.githubusercontent.com/u/30841820?s=400&u=8f1599e9dfdaa4c8e2f71c4afa6540b1e0425283&v=4' centered size='small' avatar/>
                        <div>
                            <h3>Christopher Peter</h3>
                        </div>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid.Row style={{backgroundColor: '#9d9d9d', height: '20vh'}}>
                   asdfasd
            </Grid.Row>
                
                

{/* 1. FASTER AND BETTER RESULTS  #868e96 === 14px
;
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
