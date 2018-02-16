import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'
import firebase from '../../../../jabroni/utilities/firebase.js'
import { Grid, Card, Feed} from 'semantic-ui-react'


const database = firebase.database();

class NewsFeed extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null,
        backgroundImage: this.props.backgroundImage,
        update: []
      }
  }

  componentDidMount(){
    console.log('heeloo', this.state.id)
    database.ref('UserData/' + this.state.id).on("value", (snapshot)=>{
      console.log('the snapshot is: ', snapshot);
      if ( !snapshot.val() ) {
        console.log('no data to display!');
      } else {
        this.setState({update: Object.values(snapshot.val()) })
      }
      // console.log('UserData',snapshot.val())
      // this.setState({message: [...this.state.message, snapshot.val()]})
    }, 
    function(errorObject){
      console.log("the read failed: " + errorObject.code);
    })
  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    return(
      <Grid centered columns={1} style={{padding: '3%', height: '100vh', overFlowY: 'auto'}}>
        <Grid.Column style={{ height: '100vh', overFlowY: 'auto'}} >
        {this.state.update.map((update)=>{
          console.log('UPDATE', update)
          if(update.diet){
            let macros = {
              calories : update.diet.calories || '',
              carbs : update.diet.carbs || '',
              protien : update.diet.protein || '',
              fat : update.diet.fat || '',
            } 
          return(
            <Card centered={true} style={{width: '75%'}}>
              <Card.Content>
                <Card.Header>
                  {update.user + ' - Diet' }
                </Card.Header>
                <Feed.Date style={{color: 'rgba(0,0,0,.4)'}}content={update.date}/> 
              </Card.Content>

              <Card.Content>
                
                <Feed>
                  <Feed.Event>
                    {/* <Feed.Label image='/assets/images/avatar/small/jenny.jpg' /> */}
                    <Feed.Content>
                      <Feed.Summary>
                        {update.diet.name}
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Card.Content description={'Calories: ' + macros.calories } style={{textIndent: '10px'}}/>
                  <Card.Content description={'Carbs: ' + macros.carbs} style={{textIndent: '10px'}}/>
                  <Card.Content description={'Protien: ' + macros.protien} style={{textIndent: '10px'}}/>
                  <Card.Content description={'Fat: ' + macros.fat } style={{textIndent: '10px'}}/>
                </Feed>
              </Card.Content>
            </Card>
          )

          } else{
            let keys = Object.keys(update.workout)
            return(
              <Card centered style={{width: '75%'}}>
                <Card.Content>
                  <Card.Header>
                  {update.user + ' - WorkOut' }
                  </Card.Header>
                  <Feed.Date style={{color: 'rgba(0,0,0,.4)'}}content={update.date}/> 
                </Card.Content>
              
                <Card.Content>
                {keys.map((key, i)=>{
                  return(
                    <div >
                      <Feed>
                        <Feed.Event style={{paddingBottom: 0 , paddingTop: 4}}>
                        {/* <Feed.Label image='/assets/images/avatar/small/jenny.jpg' /> */}
                          <Feed.Content >
                            <Feed.Summary >
                              {key}
                            </Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>
                          <Card.Content description={'Frequency: ' + update.workout[key].frequency } style={{textIndent: '10px'}}/>
                          <Card.Content description={' Weight: ' + update.workout[key].weight} style={{textIndent: '10px'}}/>
                      </Feed>
                      {/* <br/> */}
                      </div>
                    )
                  })}
                  </Card.Content>
              </Card>
            )}
          }  
        )}
        </Grid.Column>        
      </Grid>
    )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.id,
    user: store.auth.user,
    goals: store.auth.goals,
    backgroundImage: store.branding.backgroundImg
  };
};

export default withRouter(connect(
  mapStoreToProps
)(NewsFeed));