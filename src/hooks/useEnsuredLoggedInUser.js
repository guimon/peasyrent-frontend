import { useEffect } from 'react';
import {useHistory, useLocation} from "react-router-dom";

import AuthService from "../services/AuthService";
import Routes from "../constants/Routes";

export default function useEnsuredLoggedInUser() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      history.push(Routes.login);
    } else if ([Routes.tipsForResponding, Routes.tipsForInviting, Routes.tipsForSuccess].includes(location.pathname)) {
      // let it go
    }
  });
}