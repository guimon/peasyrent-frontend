import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import StripeAccountService from "../services/StripeAccountService";

export const StripeAccountsContext = React.createContext(null);

export default function StripeAccountsStore(props) {
  const { children, vacant_only } = props;
  const history = useHistory();
  const [stripeAccounts, setStripeAccounts] = useState();

  useEffect(() => {
    StripeAccountService.index().then(response => {
      setStripeAccounts(response.data.data.map((hash) => {return hash.attributes}));
    }).catch(error => { ErrorHandlerHelper(error, history) });
  }, [vacant_only, history]);

  const deleteStripeAccount = (id, openSnackbar) => {
    StripeAccountService.deleteStripeAccount(id).then(response => {
      let index = stripeAccounts.findIndex(p => p.id === id);
      setStripeAccounts(state => state.splice(index, 1));
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { stripeAccounts, deleteStripeAccount };

  return <StripeAccountsContext.Provider value={store}>{stripeAccounts && children}</StripeAccountsContext.Provider>
}