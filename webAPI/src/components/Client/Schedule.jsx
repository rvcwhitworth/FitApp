import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'
import Questionaire from './goalsQuestionaire.jsx'

class Schedule extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null
      }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({goals: nextProps.goals})
  }

  render() {
    return (
      <div> This is the schedule view </div>
    )
  }
}

const mapStoreToProps = (store) => {
  console.log('store in calendar', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
    goals: store.auth.goals
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Schedule));