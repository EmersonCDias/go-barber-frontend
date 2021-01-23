import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';
import DashBoard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={SignIn} exact />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/dashboard" component={DashBoard} isPrivate />
  </Switch>
);

export default Routes;