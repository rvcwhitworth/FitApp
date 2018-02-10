console.log('Hello World!');
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../actions/example.jsx'
import Bypass from '../actions/bypass.jsx'
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import Auth from '../actions/authorize.jsx'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';
import gql from 'graphql-tag';

const q = gql`
  query loginUser($username: String!, $password: String!){
    loginUser(username: $username, password: $password) {
      id
      fullName
      username
      type
      email
      profile_data
      Spotter {
        id
        trainer{
          id
          fullName
        }
        client{
          id
          fullName
        }
      }
      Exercise_Plan {
        id
        name
        regimen
        trainer{
          id
          fullName
        }
        client{
          id
          fullName
        }
      }
      Personal_Record {
        id
        data
      }
      Chat_Room {
        id
        room_id
        user {
          id
          fullName
        }
      }
    }}`


  //   }
  // }
// query { loginUser(username: "test", password: "test") {
//       id
//       fullName
//       username
//       type
//       email
//       profile_data
//       Spotter {
//         id
//         trainer {
//           id
//           fullName
//         }
//         client {
//           id
//           fullName
//         }
//       }
// } }



//login
class LogIn extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        ClientUsername : '',
        ClientPassword : '',
        TrainerUsername: '',
        TrainerPassword: ''
      }
      this.onClientPasswordChange = this.onClientPasswordChange.bind(this);
      this.onClientUsernameChange = this.onClientUsernameChange.bind(this);
      this.handleClientButtonClick = this.handleClientButtonClick.bind(this);
      this.onTrainerPasswordChange = this.onTrainerPasswordChange.bind(this);
      this.onTrainerUsernameChange = this.onTrainerUsernameChange.bind(this);
      this.handleTrainerButtonClick = this.handleTrainerButtonClick.bind(this);
      this.logIn = this.logIn.bind(this)
  }

  componentDidMount() {
    //runs only once we can set a general init dispatch/action here
    // this.props.dispatch(ChangeUser('Jason'))
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    //need to basically set props here which is anmnoying
  }

  onClientPasswordChange(e) {
    this.setState({
      ClientPassword: e.target.value
    })
  }

  onClientUsernameChange(e) {
    this.setState({
      ClientUsername : e.target.value
    })
  }

  onTrainerPasswordChange(e) {
    this.setState({
      TrainerPassword: e.target.value
    })
  }

  onTrainerUsernameChange(e) {
    this.setState({
      TrainerUsername : e.target.value
    })
  }

  handleTrainerButtonClick(){
    var payload = {
      ClientUsername: this.state.TrainerUsername,
      ClientPassword: this.state.TrainerPassword,
      type: 'Trainer'
    }

    console.log('THIS IS THE PAYLOAD', payload)
    this.props.dispatch(Bypass(payload))
    // this.props.dispatch(ChangeUser(payload))
  }

  logIn(e){
    e.preventDefault();
    console.log('what is state rn?', this.state, e.target)
    var type = e.target.id
    console.log('type', type)
    if(type === 'Client'){
    var values = {
      username: this.state.ClientUsername,
      password: this.state.ClientPassword
    }
  } else if(type === 'Trainer'){
    var values = {
      username: this.state.TrainerUsername,
      password: this.state.TrainerPassword
    }
  }
  console.log('whats values', values)
    this.props.client.query({
      query: q,
      variables: {
        username: values.username.toLowerCase(),
        password: values.password
      }
    }).then(({data}) => {
      if (!data.loginUser) {
        alert('Invalid username or password!', 'Please try again.');
      } else {
        var Exercise_Plan = data.loginUser.Exercise_Plan.map((val, key) => {
          temp = Object.assign({}, val)
          temp.regimen = JSON.parse(val.regimen)
          return temp
        })
        console.log('whats this dumb thing', Exercise_Plan)
        let payload = {
          type: type,
          PR: data.loginUser.Personal_Record,
          id: data.loginUser.id,
          Exercise_Plan: Exercise_Plan,
          Chat_Room: data.loginUser.Chat_Room,
          auth: data.loginUser.type,
          id: data.loginUser.id,
          fullName: data.loginUser.fullName,
          email: data.loginUser.email,
          spotters: data.loginUser.Spotter,
          goals: JSON.parse(data.loginUser.profile_data).goals
        }
        console.log('whats the payload', payload)
        this.props.dispatch(Auth(payload))
      }
    }).catch((err) => {
      console.log('log in error: ', err);
      alert('error logging in!', 'Check console for details');
      this.setState({
        error: true
      });
    })
  }


  handleClientButtonClick(){
    var payload = {
      ClientUsername: this.state.ClientUsername,
      ClientPassword: this.state.ClientPassword,
      type: 'Client'
    }

    console.log('THIS IS THE PAYLOAD', payload)
    this.props.dispatch(Bypass(payload))
    // this.props.dispatch(ChangeUser(payload))
  }

  render() {
    console.log('heres the state', this.state, this.props)
    return (
      <div className="container" style={{backgroundColor:'rgba(0,0,0,0.2)', textAlign:'center'}}>
        <h1 style={{fontFamily: 'Sans-Serif', color:'white'}}> Welcome </h1>
        <div style={{flexDirection:'row'}}>
          <div style={{position:'absolute', right:'50px', padding:'10px', backgroundColor:'rgba(0,0,0,0.2)'}}>
            <h2> Trainer? </h2>
            <input onChange={this.onTrainerUsernameChange} placeholder="Username" value={this.state.TrainerUsername} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
            <input onChange={this.onTrainerPasswordChange} placeholder='Password' type='password' value={this.state.TrainerPassword} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
            <button onClick={this.logIn} id='Trainer' className="btn btn-lg btn-block" type='button' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif'}}>
            <span id='Trainer' className="glyphicon glyphicon-search">Enter</span>
            </button>
          </div>
          <div style={{position:'absolute', left:'50px', padding:'10px', backgroundColor:'rgba(0,0,0,0.2)'}}>
            <h2> Client? </h2>
            <input onChange={this.onClientUsernameChange} placeholder="Username" value={this.state.ClientUsername} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
            <input onChange={this.onClientPasswordChange} placeholder='Password' type='password' value={this.state.ClientPassword} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
            <button onClick={this.logIn} id='Client' className="btn btn-lg btn-block" type='button' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif'}}>
            <span id='Client' className="glyphicon glyphicon-search">Enter</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    foo: store.example.foo,
    user: store.example.user,
    password: store.example.password
  };
};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(LogIn)));