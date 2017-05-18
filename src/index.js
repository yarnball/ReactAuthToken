import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import cookie from 'react-cookie';
import routes from './routes';
import reducers from './reducers/index';
import ReactGA from 'react-ga';
import { AUTH_USER } from './actions/types';

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

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.getElementById('wrapper')
);