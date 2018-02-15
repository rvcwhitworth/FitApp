
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LogIn from './logIn.jsx';
import Home from './Home.jsx';

import About from './about.jsx';
import SignUp from './signUp.jsx';
import Contact from './contact.jsx';
const Main = (props) => (
    <div style={{height:'100%'}}>
      <Switch>
        <Route exact path="/" render={()=><Home />}/>
        <Route exact path="/about" render={()=><About/>}/>
        <Route exact path="/contact" render={()=><Contact/> }/>
        <Route exact path="/signUp" render={()=><SignUp/> }/>
        <Route exact path="*" render={()=><Home/> }/>
      </Switch>
    </div>
  )
  
  export default Main