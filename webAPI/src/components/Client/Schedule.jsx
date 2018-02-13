import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Container } from 'semantic-ui-react'

BigCalendar.momentLocalizer(moment);
const events = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2017, 3, 0),
    end: new Date(2017, 3, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2017, 3, 7),
    end: new Date(2017, 3, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2017, 2, 13, 0, 0, 0),
    end: new Date(2017, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2017, 10, 6, 0, 0, 0),
    end: new Date(2017, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2017, 3, 9, 0, 0, 0),
    end: new Date(2017, 3, 9, 0, 0, 0),
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2017, 3, 11),
    end: new Date(2017, 3, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2017, 3, 12, 10, 30, 0, 0),
    end: new Date(2017, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2017, 3, 12, 12, 0, 0, 0),
    end: new Date(2017, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2017, 3, 12, 14, 0, 0, 0),
    end: new Date(2017, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2017, 3, 12, 17, 0, 0, 0),
    end: new Date(2017, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2017, 3, 12, 20, 0, 0, 0),
    end: new Date(2017, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2017, 3, 13, 7, 0, 0),
    end: new Date(2017, 3, 13, 10, 30, 0),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2017, 3, 17, 19, 30, 0),
    end: new Date(2017, 3, 18, 2, 0, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2017, 3, 20, 19, 30, 0),
    end: new Date(2017, 3, 22, 2, 0, 0),
  },
];


class Schedule extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        Exercise_Plan : this.props.Exercise_Plan || null
      }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({goals: nextProps.goals})
  }

  render() {
    return (
      <Container style={{height: '100%'}}>
        <BigCalendar
          events={events}
          views={[BigCalendar.Views.MONTH]}
          defaultDate={new Date(2017, 2, 1)}
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