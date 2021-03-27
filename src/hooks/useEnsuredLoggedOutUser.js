import { useEffect } from 'react';
import {useHistory} from "react-router-dom";

import AuthService from "../services/AuthService";

import RouteConstants from "../RouteConstants";

export default function useEnsuredLoggedOutUser() {
  const history = useHistory();

  useEffect(() => {
    if (AuthService.loggedIn()) {
      history.push(RouteConstants.dashboard);
    }
  });
}