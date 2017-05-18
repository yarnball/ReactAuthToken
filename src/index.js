import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { Router, browserHistory } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import routes from './routes';
import reducers from './reducers/index';
import ReactGA from 'react-ga';
import { AUTH_USER } from './actions/types';
// import App from './App';
import './index.css';

ReactGA.initialize('UA-000000-01');

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token')
if (token) {
  store.dispatch({ type: AUTH_USER })
}

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}


ReactDOM.render(
  <BrowserRouter store={store}>
    <Route routes={routes} onUpdate={logPageView} />
  </BrowserRouter>,
  document.getElementById('.wrapper')
);