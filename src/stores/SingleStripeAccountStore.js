import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import StripeAccountService from "../services/StripeAccountService";

export const SingleStripeAccountContext = React.createContext(null);

export default function SingleStripeAccountStore(props) {
  const { children, id } = props;
  const history = useHistory();
  const [stripeAccount, setStripeAccount] = useState();

  useEffect(() => {
    if (id) {
      StripeAccountService.loadStripeAccount(id).then(response => {
        setStripeAccount(response.data.data.attributes);
      }).catch(error => {
        ErrorHandlerHelper(error, history)
      });
    } else {
      setStripeAccount({});
    }
  }, [id, history]);

  const saveStripeAccount = (stripeAccount, openSnackbar, callback) => {
    StripeAccountService.saveStripeAccount(stripeAccount).then(response => {
      setStripeAccount(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000, callback});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const updateStripeAccount = (stripeAccount, openSnackbar, callback) => {
    StripeAccountService.updateStripeAccount(stripeAccount).then(response => {
      setStripeAccount(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000, callback});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const deleteStripeAccount = (stripeAccount, openSnackbar, callback) => {
    StripeAccountService.deleteStripeAccount(stripeAccount).then(response => {
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      if (callback) {
        callback();
      }
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { stripeAccount, saveStripeAccount, updateStripeAccount, deleteStripeAccount };

  return <SingleStripeAccountContext.Provider value={store}>{stripeAccount && children}</SingleStripeAccountContext.Provider>
}