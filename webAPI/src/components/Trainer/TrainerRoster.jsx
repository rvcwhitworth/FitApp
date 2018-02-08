import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import axios from 'axios'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={500}
    classNames="example"
  >
    {children}
  </CSSTransition>
);

class FadeInAndOut extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { show: false };

    setInterval(() => {
      this.setState({ show: !this.state.show })
    }, 500)
  }
  
  render() {
    return (
      <Fade in={this.state.show}>
        <div className='greeting'>Hello world</div>
      </Fade>
    )
  }
}

class Roster extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null,
        backgroundImage: this.props.backgroundImage
      }
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {

      return(
        <FadeInAndOut />
        )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
    goals: store.auth.goals,
    backgroundImage: store.branding.backgroundImg,
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Roster));