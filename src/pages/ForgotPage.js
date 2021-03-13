import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import store2 from 'store2';

import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography';

import AuthService from '../services/AuthService';
import ReducedContainer from "../components/ReducedContainer";
import { openSnackbar } from '../components/Notifier';
import Routes from "../constants/Routes";
import StyledButton from "../components/StyledButton";
import Validator from "../helpers/Validator";
import BottomNavLink from "../components/BottomNavLink";
import useEnsuredLoggedOutUser from "../hooks/useEnsuredLoggedOutUser";
import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";

function ForgotPage() {
  useEnsuredLoggedOutUser();
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail( store2.get('email') || '' );
  }, []);

  const catchReturn = (event) => {
    if (event.key === 'Enter') {
      requestPasswordReset();
    }
  };

  const requestPasswordReset = () => {
    store2.set('email', email);
    AuthService.resetPassword(email).then(() => {
      let message = "If your email address exists in our database, you will receive a password " +
          "recovery link at your email address in a few minutes.";
      openSnackbar({ message: message, variant: 'success', timeout: 6000});

      setTimeout(() => {
        history.push(Routes.login);
      }, 6000);
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!");
    });
  };

  return (
    <ReducedContainer>
      <Typography color="primary" variant={"h6"}>
        {"Type your email to request a password recovery link in your email"}
      </Typography>
      <TextField
          label={"Your email"}
          margin="normal"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onKeyPress={catchReturn}
          error={!Validator.validEmail(email)}
          autoFocus
      />
      <StyledButton
          label={"Send instructions"}
          onClick={requestPasswordReset}
          enabled={Validator.validEmail(email)}
      />
      <BottomNavLink
          route={Routes.login}
          color={"primary"}
          message={"Back"}
      />
    </ReducedContainer>
  )
}

export default ForgotPage;