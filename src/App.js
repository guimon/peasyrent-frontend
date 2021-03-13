import React, {Component} from 'react'
import 'typeface-roboto';
import { BrowserRouter as Router, Route } from "react-router-dom";
import FullStory from 'react-fullstory';

import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import ForgotPage from './pages/ForgotPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import Routes from "./constants/Routes";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import DashboardPage from "./pages/DashboardPage";

const styles = theme => ({
  base: {
    width: '100%',
    height: '100%',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
  }
});

const theme = createMuiTheme({
  typography: {
    fontSize: 12,
    h6: {
      fontWeight: "normal",
      fontSize: 18,
    }
  },
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    background: {
      paper: '#fff',
      default: '#fafafa'
    },
    primary: {
      light: 'rgba(94, 183, 247, 1)',
      main: 'rgba(47, 166, 230, 1)',
      dark: 'rgba(0, 105, 162, 1)',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(251, 234, 34, 1)',
      main: 'rgba(255,253,0,1)',
      dark: 'rgba(211, 195, 8, 1)',
      contrastText: 'rgba(61, 61, 61, 1)'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.95)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  },
  overrides: {
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: 'rgba(251, 234, 34, 1)',
        },
      },
      root: {
        '&$selected': {
          backgroundColor: 'rgba(94, 183, 247, 1)',
          color: '#fff',

          '&:hover': {
            backgroundColor: 'rgba(47, 166, 230, 1)',
            color: '#fff',
          },
        }
      }
    },
  }
});


class App extends Component {
  render() {
    const { classes } = this.props;

    return (
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            { !window.reactSnapshotRender &&
              <FullStory org={process.env.REACT_APP_FULLSTORY_ORG}/>
            }
            <div className={classes.base} >
              <Route path={Routes.forgotPassword} exact component={ForgotPage} />
              <Route path={Routes.login} exact component={LoginPage}/>
              <Route path={Routes.logout} exact component={LogoutPage} />
              <Route path={Routes.privacyPolicy} exact component={PrivacyPolicyPage}/>
              <Route path={Routes.resetPassword} exact component={ResetPasswordPage} />
              <Route path={Routes.root} exact component={HomePage}/>
              <Route path={Routes.signup} exact component={SignupPage} />
              <Route path={Routes.termsAndConditions}  exact component={TermsAndConditionsPage}/>
              <Route path={Routes.dashboard}  exact component={DashboardPage}/>
              <Route path={Routes.admin} exact component={AdminDashboardPage} />
            </div>
          </ThemeProvider>
        </Router>
    );
  }
}

export default withStyles(styles)(App);
