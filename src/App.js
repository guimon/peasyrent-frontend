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
      main: '#00B32D',
      contrastText: '#fff'
    },
    secondary: {
      main: '#ff2e39',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
  },
  overrides: {
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: '#00B32D',
        },
      },
      root: {
        '&$selected': {
          backgroundColor: '#f44336',
          color: '#fff',

          '&:hover': {
            backgroundColor: '#f44336',
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
