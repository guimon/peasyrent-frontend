import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WithLayout from './WithLayout';
import { Main, Simple } from './layouts';

import {
  Account as AccountView,
  CompanyTerms as CompanyTermsView,
  ContactPageCover as ContactPageCoverView,
  Home as HomeView,
  NotFound as NotFoundView,
  PasswordResetSimple as PasswordResetSimpleView,
  SigninSimple as SigninSimpleView,
  SignupSimple as SignupSimpleView,
  PasswordResetNew,
  Dashboard,
} from './views';
import RouteConstants from "./RouteConstants";

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path={RouteConstants.root}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={HomeView}
            layout={Main}
          />
        )}
      />
      <Route
        exact
        path={RouteConstants.terms}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={CompanyTermsView}
            layout={Main}
          />
        )}
      />
      <Route
        exact
        path={RouteConstants.contact}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={ContactPageCoverView}
            layout={Main}
          />
        )}
      />
      <Route
        exact
        path={RouteConstants.resetPassword}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={PasswordResetSimpleView}
            layout={Simple}
          />
        )}
      />
      <Route
        exact
        path={RouteConstants.resetPasswordNew}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={PasswordResetNew}
            layout={Simple}
          />
        )}
      />
      <Route
        exact
        path={RouteConstants.login}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={SigninSimpleView}
            layout={Simple}
          />
        )}
      />
      <Route
        exact
        path={RouteConstants.signup}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={SignupSimpleView}
            layout={Simple}
          />
        )}
      />
      <Route
        exact
        path={RouteConstants.account}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={AccountView}
            layout={Main}
          />
        )}
      />
      <Route
        exact
        path={RouteConstants.dashboard}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={Dashboard}
            layout={Main}
          />
        )}
      />
      <Route
        exact
        path={RouteConstants.notFound}
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={NotFoundView}
            layout={Simple}
          />
        )}
      />
      <Redirect to={RouteConstants.notFound} />
    </Switch>
  );
};

export default Routes;

