import { useEffect } from 'react';
import {useHistory} from "react-router-dom";
import RouteConstants from "../RouteConstants";
import UserService from "../services/UserService";

export default function useEnsuredUserIsAdmin() {
  const history = useHistory();

  useEffect(() => {
    if (!UserService.getUser() || !UserService.getUser().is_admin) {
      history.push(RouteConstants.account);
    }
  });
}