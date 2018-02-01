import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Store from './store.jsx'
import LogIn from './components/logIn.jsx'
import newUser from './components/newUser.jsx'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import Header from './components/router.jsx'

console.log('store import', Store)

const history = syncHistoryWithStore(createBrowserHistory(), Store)

//basically a switch or an if/else



ReactDOM.render(
  <Provider store={Store}>
  <ApolloProvider client={this.client}>
      <Router history={history}>
      <Header />
      </Router>
  </ApolloProvider>
  </Provider> , 
  document.getElementById('mount'));