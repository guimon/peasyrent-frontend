import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import LeaseService from "../services/LeaseService";

export const SingleLeaseContext = React.createContext(null);

export default function SingleLeaseStore(props) {
  const { children, id } = props;
  const history = useHistory();
  const [lease, setLease] = useState();

  useEffect(() => {
    if (id) {
      LeaseService.loadLease(id).then(response => {
        setLease(response.data.data.attributes);
      }).catch(error => {
        ErrorHandlerHelper(error, history)
      });
    } else {
      setLease({});
    }
  }, [id, history]);

  const saveLease = (lease, openSnackbar) => {
    LeaseService.saveLease(lease).then(response => {
      setLease(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const updateLease = (lease, openSnackbar) => {
    LeaseService.updateLease(lease).then(response => {
      setLease(response.data.data.attributes);
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
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const deleteFile = (leaseId, fileId, openSnackbar) => {
    LeaseService.deleteFile(leaseId, fileId).then(response => {
      setLease(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const saveFile = (leaseId, path, initialFilename, openSnackbar, finishedCallback) => {
    LeaseService.saveFile(leaseId, path, initialFilename).then(response => {
      setLease(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      finishedCallback();
    }).catch(error => {
      finishedCallback();
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const deleteRenter = (leaseId, renterId, openSnackbar) => {
    LeaseService.deleteRenter(leaseId, renterId).then(response => {
      setLease(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const saveRenter = (leaseId, renter, openSnackbar, finishedCallback) => {
    LeaseService.saveRenter(leaseId, renter).then(response => {
      setLease(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      finishedCallback();
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { lease, saveLease, updateLease, deleteLease, saveFile, deleteFile, saveRenter, deleteRenter };

  return <SingleLeaseContext.Provider value={store}>{lease && children}</SingleLeaseContext.Provider>
}