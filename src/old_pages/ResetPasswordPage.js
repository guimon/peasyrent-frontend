import React, {useState} from 'react';
import queryString from 'query-string/index';
import { useLocation, useHistory } from 'react-router';

import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment/index';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton/index';

import AuthService from '../services/AuthService';
import ReducedContainer from "../components/ReducedContainer";
import { openSnackbar } from '../components/Notifier';
import Routes from "../Routes";
import StyledButton from "../components/StyledButton";
import BottomNavLink from "../components/BottomNavLink";
import useEnsuredLoggedOutUser from "../hooks/useEnsuredLoggedOutUser";
import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";

function ResetPasswordPage() {
  useEnsuredLoggedOutUser();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState('');
  const location = useLocation();
  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const newPasswordMatch = () => {
    return newPassword === confirmPassword && (newPassword === '' || confirmPassword.length >= 6);
  };

  const catchReturn = (event) => {
    if (event.key === 'Enter') {
      saveNewPassword();
    }
  };

  const saveNewPassword = () => {
    const values = queryString.parse(location.search);

    AuthService.saveNewPassword(newPassword, values.reset_password_token).then(() => {
      openSnackbar({ message: "New password set successfully! Please login now!",
        variant: 'success', timeout: 3000 });

      setTimeout(() => {
        history.push(Routes.login);
      }, 3000);
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  return (
    <ReducedContainer>
      <Typography>
        {"Create your new password here with at least 6 characters"}
      </Typography>
      <TextField
          label={"New password"}
          margin="normal"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          id="password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          autoFocus
          InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                      aria-label={"Toggle password visibility"}
                      onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            ),
          }}
      />
      <TextField
          label={"Confirm new password"}
          margin="normal"
          variant="outlined"
          type={showPasswordConfirmation ? 'text' : 'password'}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          error={!newPasswordMatch()}
          onKeyPress={catchReturn}
          InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                      aria-label={"Toggle password visibility"}
                      onClick={handleClickShowPasswordConfirmation}
                  >
                    {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            ),
          }}
      />
      <StyledButton
          label={"Save new password"}
          onClick={saveNewPassword}
          enabled={newPasswordMatch()}
      />
      <BottomNavLink
          route={Routes.login}
          color={"primary"}
          message={"Back"}
      />
    </ReducedContainer>
  )
}

export default ResetPasswordPage;