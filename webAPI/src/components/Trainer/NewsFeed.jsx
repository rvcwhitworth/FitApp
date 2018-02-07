import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'

class NewsFeed extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null
      }
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {

      return(
        <div> This is where our updates will go</div>
        )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
    goals: store.auth.goals
  };
};

export default withRouter(connect(
  mapStoreToProps
)(NewsFeed));