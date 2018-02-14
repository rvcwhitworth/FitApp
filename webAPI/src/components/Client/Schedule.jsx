import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import Calendar from 'react-calendar';
import moment from 'moment';
import { Container, Sidebar, Segment, Button, Header } from 'semantic-ui-react';

class Schedule extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        Exercise_Plan : this.props.Exercise_Plan || null,
        date: new Date(),
        visible: true
      }
      this.displayWorkout = this.displayWorkout.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({goals: nextProps.goals})
  }

  handleClick (date) {
    console.log('DATE CLICKED', date);
  }

  displayWorkout ({ date, view }) {
    if (view === 'month') {
      switch (date.getDay()) {
        case 0:
        return <p> It's Sunday! </p>;
        case 1:
        return <p> It's Monday! </p>;
        case 2:
        return <p> It's Tuesday! </p>;
        case 3:
        return <p> It's Wednesday! </p>;
        case 4:
        return <p> It's Thursday! </p>;
        case 5:
        return (
          <div> 
            <p>How much space </p>
            <p>Do these </p>
            <p>haaaaaaaaaaaa</p>
          </div>
        );
        case 6:
        return <p> It's Saturday! </p>;
      }
    }
    return null;
  }

  render() {
    return (
      <Container style={{height: '60em', width: '75%', padding: '1em', backgroundColor: '#fffcf9'}}>
        <Calendar 
          onChange={(date) => this.setState({date})}
          value={this.state.date}
          tileContent={this.displayWorkout}
          onClick={this.handleClick}
        />
      </Container>
    )
  }
}

const mapStoreToProps = (store) => {
  console.log('store in calendar', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
    Exercise_Plan: store.auth.Exercise_Plan
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Schedule));