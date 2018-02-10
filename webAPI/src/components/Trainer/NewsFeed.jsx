import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'
import firebase from '../../../../jabroni/utilities/firebase.js'
import { Feed} from 'semantic-ui-react'


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
    console.log('heeloo')
    database.ref('UserData/' + 4).on("value", (snapshot)=>{
      this.setState({update: Object.values(snapshot.val()) })
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
        <div>
          <Feed>
            {this.state.update.map((update)=>{
              console.log('UPDATE', update)
              if(update.diet){
                return(
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        {update.user}
                        <Feed.Date>{update.date}</Feed.Date>
                      </Feed.Summary>
                      <Feed.Extra text>
                        {update.diet.name + ' ' + update.diet.calories + ' ' + update.diet.carbs + ' ' + ' ' + update.diet.protien + ' ' + update.diet.fat }
                      </Feed.Extra>
                    </Feed.Content>
                  </Feed.Event>
                )
              } else{
                let keys = Object.keys(update.workout)
                return(
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        {update.user}
                        <Feed.Date>
                          {update.date}
                        </Feed.Date>
                      </Feed.Summary>
                      {keys.map((key, i)=>{
                        return(
                          <Feed.Extra text>
                            <b>{key}</b>
                            {' Frequency: ' + update.workout[key].frequency  + ' Weight: ' + update.workout[key].weight}
                          </Feed.Extra>
                        )
                      })}
                      
                    </Feed.Content>
                  </Feed.Event>
                )
              }
            })}
            <Feed.Event>
              <Feed.Content>
                <Feed.Summary>
                  Joe Henderson posted on his page
                  <Feed.Date>3 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>

          </Feed>
        </div>
        )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.auth.user,
    goals: store.auth.goals,
    backgroundImage: store.branding.backgroundImg
  };
};

export default withRouter(connect(
  mapStoreToProps
)(NewsFeed));