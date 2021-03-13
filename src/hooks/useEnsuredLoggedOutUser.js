import { useEffect } from 'react';
import {useHistory} from "react-router-dom";

import AuthService from "../services/AuthService";

import Routes from "../constants/Routes";

export default function useEnsuredLoggedOutUser() {
  const history = useHistory();

  useEffect(() => {
    if (AuthService.loggedIn()) {
      history.push(Routes.invites);
    }
  });
}