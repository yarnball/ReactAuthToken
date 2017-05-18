import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST } from './types';

//= ===============================
// Authentication actions
//= ===============================

// TO-DO: Add expiration to cookie
export function loginUser({ username, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/2042watkin/obtain-auth-token/`, { username, password })
    .then((response) => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      cookie.save('dtoken', response.data.dtoken, { path: '/' });
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', response.data.user)
      console.log('token')
      console.log(JSON.stringify(response.data))
      // window.location.reload()
      // Don't use `browserHistory.push('/login');` as it will not 'reload' the page (ie use the setItem token above)
      location.pathname = '/dashboard'
      // console.log('this is login' + JSON.stringify(response))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function registerUser({ email, firstName, lastName, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
    .then((response) => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      cookie.remove('dtoken', { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function logoutUser(error) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER, payload: error || '' });
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });
    cookie.remove('dtoken', { path: '/' });
    localStorage.removeItem('token');
    localStorage.removeItem('user')

    window.location.href = `${CLIENT_ROOT_URL}/login`;
  };
}

export function getForgotPasswordToken({ email }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/forgot-password`, { email })
    .then((response) => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        payload: response.data.message,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function resetPassword(token, { password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
    .then((response) => {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
        payload: response.data.message,
      });
      // Redirect to login page on successful password reset
      browserHistory.push('/login');
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

// export function protectedTest() {
//   return function (dispatch) {
//     axios.get(`${API_URL}/2042watkin/obtain-auth-token/`, {
//       headers: { JWT: cookie.load('token') },
//     })
//     .then((response) => {
//       dispatch({
//         type: PROTECTED_TEST,
//         payload: response.data.content,
//       });
//     })
//     .catch((error) => {
//       errorHandler(dispatch, error.response, AUTH_ERROR);
//     });
//   };
// }
