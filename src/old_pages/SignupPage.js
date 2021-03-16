import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string/index'

import TextField from '@material-ui/core/TextField/index';
import InputAdornment from '@material-ui/core/InputAdornment/index';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton/index';

import ReducedContainer from "../components/ReducedContainer";
import { openSnackbar } from '../components/Notifier';
import Routes from "../Routes";
import BottomNavLink from "../components/BottomNavLink";
import WaitListService from "../services/WaitListService";
import AuthService from "../services/AuthService";
import Validator from "../helpers/Validator";
import StyledButton from "../components/StyledButton";
import useEnsuredLoggedOutUser from "../hooks/useEnsuredLoggedOutUser";
import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";

function SignupPage() {
  useEnsuredLoggedOutUser();

  const history = useHistory();

  const location = useLocation();
  const invite = queryString.parse(location.search).invite;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const trySignup = () => {
    AuthService.signup(name, email, password, invite).then(response => {
      openSnackbar({ message: 'Signup successful!', variant: 'success', timeout: 2000 });

      setTimeout(() => {
        history.push(Routes.setTimezone);
      }, 2000);
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Signup failed! Please try again later!")
    });
  };

  useEffect(() => {
    if (invite) {
      WaitListService.validateInviteRequest(invite).then(response => {
        setEmail(response.data.email);
      }).catch(error => {
        ErrorHandlerHelper(error, history, openSnackbar, "Invitation not found", Routes.signupWaitlist)
      });
    } else {
      history.push(Routes.signupWaitlist);
    }
  }, [history, invite]);

  return (
    <ReducedContainer>
      <TextField
          label={"Email"}
          margin="normal"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id={"email_input"}
          InputLabelProps={{ shrink: true }}
          error={!Validator.validEmail(email)}
      />
      <TextField
          label={"Name"}
          margin="normal"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          value={name}
          id={"name_input"}
          error={!Validator.validName(name)}
      />
      <TextField
          label={"Password"}
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          variant="outlined"
          id="password_input"
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') { trySignup() } }}
          error={!Validator.validPassword(password)}
          InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                      aria-label={"Toggle password vislibility"}
                      onClick={() => (setShowPassword(!showPassword))}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            ),
          }}
      />
      <StyledButton
          onClick={() => trySignup()}
          label={"Sign up"}
          enabled={Validator.present(name) && Validator.present(email) && Validator.present(password) && Validator.validPassword(password) && Validator.validEmail(email)}
      />

      <BottomNavLink
          route={Routes.login}
          color={"primary"}
          message={"Login"}
      />
    </ReducedContainer>
  )
}

export default SignupPage;