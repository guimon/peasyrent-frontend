import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import LeaseService from "../services/LeaseService";

export const LeasesContext = React.createContext(null);

export default function LeasesStore(props) {
  const { children, for_messages, requires_attention } = props;
  const history = useHistory();
  const [leases, setLeases] = useState();

  useEffect(() => {
    LeaseService.index(for_messages, requires_attention).then(response => {
      setLeases(response.data.data.map((hash) => {return hash.attributes}));
    }).catch(error => { ErrorHandlerHelper(error, history) });
  }, [history, for_messages, requires_attention]);

  const deleteLease = (id, openSnackbar) => {
    LeaseService.deleteLease(id).then(response => {
      let index = leases.findIndex(p => p.id === id);
      setLeases(state => state.splice(index, 1));
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { leases, deleteLease };

  return <LeasesContext.Provider value={store}>{leases && children}</LeasesContext.Provider>
}