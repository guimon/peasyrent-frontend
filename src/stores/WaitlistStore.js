import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import WaitListService from "../services/WaitListService";

export const WaitlistContext = React.createContext(null);

export default (props) => {
  const { children } = props;
  const history = useHistory();
  const [waitlists, setWaitlists] = useState();

  useEffect(() => {
    WaitListService.loadWaiting().then(response => {
      setWaitlists(response.data.data.map((hash) => {return hash.attributes}));
    }).catch(error => { ErrorHandlerHelper(error, history) });
  }, [history]);

  const deleteWaitlist = (id, openSnackbar) => {
    WaitListService.deleteWaitlist(id).then(response => {
      setWaitlists(response.data.data.map((hash) => {return hash.attributes}));
      openSnackbar({ message: "Waitlist deleted successfully!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { waitlists, deleteWaitlist };

  return <WaitlistContext.Provider value={store}>{waitlists && children}</WaitlistContext.Provider>
}