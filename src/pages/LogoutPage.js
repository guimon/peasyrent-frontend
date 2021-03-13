import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";

import {Typography} from "@material-ui/core";

import AuthService from '../services/AuthService';
import ReducedContainer from "../components/ReducedContainer";
import {openSnackbar} from "../components/Notifier";
import Routes from "../constants/Routes";
import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";


function LogoutPage() {
  const history = useHistory();

  useEffect(() => {
    AuthService.logout().then(() => {
      history.push(Routes.login);
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, 'Logout failed!')
    });
  }, [history]);

  return (
    <ReducedContainer>
      <Typography variant="subtitle1">Logging out...</Typography>
    </ReducedContainer>
  )
}

export default LogoutPage;