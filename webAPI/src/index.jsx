import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Store from './store/store.jsx'
// import LogIn from './components/logIn.jsx'
// import newUser from './components/newUser.jsx'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import Header from './components/router.jsx'

console.log('store import', Store)

const history = syncHistoryWithStore(createBrowserHistory(), Store)
const HOST_URI = 'http://ec2-18-219-7-36.us-east-2.compute.amazonaws.com:8080/graphql';
//const HOST_URI = 'http://localhost:8080/graphql';
//basically a switch or an if/else
const client = new ApolloClient({
	link: new HttpLink({ uri: HOST_URI}),
    cache: new InMemoryCache()
});

ReactDOM.render(
  <Provider store={Store}>
    <ApolloProvider client={client}>
        <Router history={history}>
            <Header/>
        </Router>
    </ApolloProvider>
  </Provider> , 
  document.getElementById('mount'));
