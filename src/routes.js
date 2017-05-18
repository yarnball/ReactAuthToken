
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

import HomePage from './components/pages/home-page';

import NotFoundPage from './components/pages/not-found-page';

import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import ForgotPassword from './components/auth/forgot_password';
import ResetPassword from './components/auth/reset_password';

import Dashboard from './components/dashboard/dashboard';

import RequireAuth from './components/auth/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="forgot-password" component={ForgotPassword} />
    <Route path="reset-password/:resetToken" component={ResetPassword} />
    <Route path="dashboard">
      <IndexRoute component={RequireAuth(Dashboard)} />
      </Route>

    <Route path="*" component={NotFoundPage} />
  </Route>
);
