import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import store2 from 'store2';

import TextField from '@material-ui/core/TextField/index';
import InputAdornment from '@material-ui/core/InputAdornment/index';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton/index';

import AuthService from '../services/AuthService';
import ReducedContainer from "../components/ReducedContainer";
import { openSnackbar } from '../components/Notifier';
import StyledButton from "../components/StyledButton";
import Routes from "../constants/Routes";
import Validator from "../helpers/Validator";
import BottomNavLink from "../components/BottomNavLink";
import useEnsuredLoggedOutUser from "../hooks/useEnsuredLoggedOutUser";

function LoginPage() {
  useEnsuredLoggedOutUser();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validPassword = (password) => {
    return password === '' || password.length >= 6;
  };

  const tryLogin = () => {
    AuthService.login(email, password).then(response => {
      store2.set('email', email);
      history.push(Routes.dashboard);
    }).catch(error => {
      openSnackbar({ message: 'Login failed!', variant: 'error', timeout: 3000 });
    });
  };

  useEffect(() => {
    setEmail(store2.get('email') || '');
  }, []);

  return (
    <ReducedContainer>
      <TextField
        label={"Email"}
        margin="normal"
        variant="outlined"
        id="email_input"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={!Validator.validEmail(email)}
        autoFocus
      />
      <TextField
        label={"Password"}
        type={showPassword ? 'text' : 'password'}
        margin="normal"
        variant="outlined"
        id="password_input"
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => { if (e.key === 'Enter') { tryLogin(history, email, password) } }}
        error={!validPassword(password)}
        InputProps={{
          endAdornment: (
              <InputAdornment position="end">
                <IconButton
                    aria-label={"Toggle password vislibility"}
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          ),
        }}
      />
      <StyledButton
        onClick={() => tryLogin(history, email, password)}
        label={"Login"}
        enabled={validPassword(password) && Validator.validEmail(email)}
      />
      <BottomNavLink
          route={Routes.forgotPassword}
          color={"primary"}
          message={"Forgot password?"}
      />
    </ReducedContainer>
  )
}

export default LoginPage;