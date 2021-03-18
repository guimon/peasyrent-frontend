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
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
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
        path="/company-terms"
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
        path="/contact"
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
        path="/password-reset"
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
        path="/user/password/edit"
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
        path="/login"
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
        path="/signup"
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
        path="/account"
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
        path="/not-found"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={NotFoundView}
            layout={Simple}
          />
        )}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

