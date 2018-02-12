import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LogIn from './logIn.jsx';
import SignUp from './signUp.jsx';
import ClientProfile from './Client/ClientProfile.jsx'
import Logout from '../actions/userLogout.jsx'
import TrainerProfile from './Trainer/TrainerProfile.jsx'
import WorkoutPlans from './Trainer/WorkoutPlans.jsx'
import Roster from './Trainer/TrainerRoster.jsx'
import NewsFeed from './Trainer/NewsFeed.jsx'
import ClientAnalytics from './Client/ClientAnalytics.jsx'
import ClientTeam from './Client/ClientTeam.jsx'
import TrainerSettings from './Trainer/TrainerSettings.jsx'
import Chat from './Chat.jsx'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';

class Header extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        auth: this.props.auth || null,
        type: this.props.type || null
      }
      this.handleClick = this.handleClick.bind(this)
      console.log('does this have auth', this.props)
  }

  componentWillReceiveProps (nextProps){
    console.log('inside header', nextProps)
    if(!this.state.auth){
    this.setState({
      auth: nextProps.auth,
      type: nextProps.type
    })
    }
  }

    handleClick() {
      console.log('dafuq', this.props)
      this.props.dispatch(Logout())
      this.setState({auth:null, type:null}, this.props.history.push('/'))
    }

  render() {
    console.log('what is the router props', this.props)
    console.log('what is the state of the router', this.state)
    if(!this.state.type){

    return(
      <div stlye={{backgroundColor: 'rgba(0,0,0, 0.9)'}}>
        <div className='Seven blue ui buttons'>
          <ul>
            <button className="ui button"><Link style={{color:'white'}} to="/">Log In!</Link></button>
            <button className="ui button"><Link style={{color:'white'}} to='/signUp'>Signup</Link></button>
          </ul>
        </div>

        <hr/>

        <Route exact path='/' component={LogIn}/>
        <Route exact path='/signUp' component={SignUp}/>

       </div>
      )
  } else if(this.state.type === 'Client'){
    return(
      <div stlye={{backgroundColor: 'rgba(0,0,0, 0.9)'}}>
        <div className='Seven blue ui buttons'>
        <ul>
        <button className="ui button" ><Link style={{color:'white'}} to="/">Profile</Link></button>
        <button className="ui button" ><Link style={{color:'white'}} to='/signUp'>Photos</Link></button>
        <button className="ui button" ><Link style={{color:'white'}} to='/Analytics'>Analytics</Link></button>
        <button className="ui button" ><Link style={{color:'white'}} to='/signUp'>Planner</Link></button>
        <button className="ui button" ><Link style={{color:'white'}} to='/Team'>Team</Link></button>
        <button className="ui button" ><Link style={{color:'white'}} to='/Chat'>Chat</Link></button>
        <button className="ui button" ><Link style={{color:'white'}} to='/Settings'>Settings</Link></button>
        <button className="ui button" onClick={this.handleClick} >Log out</button>
        </ul>
        </div>

        <hr/>

        <Route exact path='/' component={ClientProfile}/>
        <Route exact path='/Settings' component={ClientProfile}/>
        <Route exact path='/Analytics' component={ClientAnalytics}/>
        <Route exact path='/Team' component={ClientTeam}/>
        <Route exact path='/Chat' component={Chat}/>

      </div>
      )
  } else if(this.state.type === 'Trainer'){
    return(
      <div stlye={{backgroundColor: 'rgba(0,0,0, 0.9)'}}>
        <div className='Seven blue ui buttons'>
        <ul>
        <button className="ui button"><Link style={{color:'white'}} to="/">Profile</Link></button>
        <button className="ui button"><Link style={{color:'white'}} to='/Updates'>News Feed</Link></button>
        <button className="ui button"><Link style={{color:'white'}} to='/Roster'>Roster</Link></button>
        <button className="ui button"><Link style={{color:'white'}} to='/WorkoutPlans'>Workout Plans</Link></button>
        <button className="ui button"><Link style={{color:'white'}} to='/Chat'>Chat</Link></button>
        <button className="ui button"><Link style={{color:'white'}} to='/Settings'>Settings</Link></button>
        <button className="ui button" onClick={this.handleClick} >Log out</button>
        <button className="ui button" onClick={this.handleClick} >Switch to Client Profile</button>

        </ul>
        </div>

        <hr/>

        <Route exact path='/' component={TrainerProfile}/>
        <Route exact path='/WorkoutPlans' component={WorkoutPlans}/>
        <Route exact path='/Roster' component={Roster}/>
        <Route exact path='/Updates' component={NewsFeed}/>
        <Route exact path='/Settings' component={TrainerSettings}/>
        <Route exact path='/Chat' component={Chat}/>



      </div>)
  }
              /*<div>
        <div style={{textAlign:'left', backgroundColor: 'rgba(0,0,0, 0.2)'}}>
        <ul>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to="/">Profile</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/analytics'>Analytics</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/measurements'>Measurements</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/progress'>Progress Photos</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/weekly'>Your Week</Link></button>
        <button className="btn btn-secondary btn-lg" onClick={this.handleClick} style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}>Log out</button>
        </ul>
        </div>

        <hr/>

        <Route exact path='/' component={Profile}/>
        <Route exact path='/weekly' component={Weekly}/>
        <Route exact path='/measurements' component={Measure}/>
        <Route exact path='/analytics' component={Analytics}/>
        <Route exact path='/progress' component={Progress}/>
      </div>*/
    }
}

const mapStoreToProps = (store) => {
  console.log('router store', store);
  return {
    auth: store.auth.auth,
    type: store.auth.type
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Header));