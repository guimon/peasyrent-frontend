import React, {useEffect, useState, useCallback} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import LeaseService from "../services/LeaseService";

export const SingleLeaseContext = React.createContext(null);

export default function SingleLeaseStore(props) {
  const { children, id } = props;
  const history = useHistory();
  const [lease, setLease] = useState();

  function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
  }
  const deserializeLease = useCallback((response) => {
    let { monthly_amount, deposit_amount } = response.data.data.attributes;
    if (monthly_amount) { monthly_amount = monthly_amount / 100 }
    if (deposit_amount) { deposit_amount = deposit_amount / 100 }
    setLease({...removeEmpty(response.data.data.attributes), monthly_amount, deposit_amount});
  }, []);

  const serializeLease = (lease) => {
    let { monthly_amount, deposit_amount } = lease;
    if (monthly_amount) { monthly_amount = monthly_amount * 100 }
    if (deposit_amount) { deposit_amount = deposit_amount * 100 }

    return {...lease, monthly_amount, deposit_amount };
  };

  useEffect(() => {
    if (id) {
      LeaseService.loadLease(id).then(response => {
        deserializeLease(response);
      }).catch(error => {
        ErrorHandlerHelper(error, history)
      });
    } else {
      setLease({});
    }
  }, [id, history, deserializeLease]);

  const saveLease = (lease, openSnackbar) => {
    LeaseService.saveLease(serializeLease(lease)).then(response => {
      deserializeLease(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const updateLease = (lease, openSnackbar) => {
    LeaseService.updateLease(serializeLease(lease)).then(response => {
      deserializeLease(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const deleteLease = (lease, openSnackbar, callback) => {
    LeaseService.deleteLease(lease).then(response => {
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      if (callback) {
        callback();
      }
    }).catch(error => {
      let errorMessage = error.response.data.error || "Request failed, please try again later!";
      ErrorHandlerHelper(error, history, openSnackbar, errorMessage)
    });
  };

  const deleteFile = (leaseId, fileId, openSnackbar) => {
    LeaseService.deleteFile(leaseId, fileId).then(response => {
      deserializeLease(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const saveFile = (leaseId, path, initialFilename, openSnackbar, finishedCallback) => {
    LeaseService.saveFile(leaseId, path, initialFilename).then(response => {
      deserializeLease(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      finishedCallback();
    }).catch(error => {
      finishedCallback();
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const deleteRenter = (leaseId, renterId, openSnackbar) => {
    LeaseService.deleteRenter(leaseId, renterId).then(response => {
      deserializeLease(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const saveRenter = (leaseId, renter, openSnackbar, finishedCallback) => {
    LeaseService.saveRenter(leaseId, renter).then(response => {
      deserializeLease(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      finishedCallback();
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { lease, saveLease, updateLease, deleteLease, saveFile, deleteFile, saveRenter, deleteRenter };

  return <SingleLeaseContext.Provider value={store}>{lease && children}</SingleLeaseContext.Provider>
}