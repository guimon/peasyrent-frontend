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

  const deserializeBillsResponse = useCallback((prevLease, response) => {
    let updatedBills =  deserializeBills(response.data.data.map((hash) => {return hash.attributes}));
    setLease({ ...prevLease, bills: updatedBills });
  }, []);

  const deserializeBills = (bills) => {
    return bills.map((bill) => {
      let { amount } = bill;
      if (amount) { amount = amount / 100 }
      return { ...bill, amount }
    });
  };

  const serializeBill = (bill) => {
    let { amount } = bill;
    if (amount) { amount = amount * 100 }

    return { ...bill, amount };
  };

  const deserializeLease = useCallback((response) => {
    let { monthly_amount, deposit_amount, bills } = response.data.data.attributes;
    if (monthly_amount) { monthly_amount = monthly_amount / 100 }
    if (deposit_amount) { deposit_amount = deposit_amount / 100 }
    let updatedLease = {...removeEmpty(response.data.data.attributes), monthly_amount, deposit_amount, bills: deserializeBills(bills) };
    setLease(updatedLease);
  }, []);

  const serializeLease = (lease) => {
    let { monthly_amount, deposit_amount } = lease;
    if (monthly_amount) { monthly_amount = monthly_amount * 100 }
    if (deposit_amount) { deposit_amount = deposit_amount * 100 }

    return { ...lease, monthly_amount, deposit_amount, property: undefined, files: undefined, renters: undefined, renter_names: undefined, messages: undefined, requires_attention: undefined, requires_attention_reason: undefined };
  };

  useEffect(() => {
    if (id) {
      LeaseService.loadLease(id).then(response => {
        deserializeLease(response);
      }).catch(error => {
        ErrorHandlerHelper(error, history)
      });
    } else {
      setLease({ property_id: '' });
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

  const deleteRenter = (leaseId, renterId, openSnackbar, finishedCallback) => {
    LeaseService.deleteRenter(leaseId, renterId).then(response => {
      deserializeLease(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      finishedCallback();
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

  const deleteBill = (lease, billId, openSnackbar, finishedCallback) => {
    LeaseService.deleteBill(lease.id, billId).then(response => {
      deserializeBillsResponse(lease, response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      finishedCallback();
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const saveBill = (lease, bill, openSnackbar, finishedCallback) => {
    LeaseService.saveBill(lease.id, serializeBill(bill)).then(response => {
      deserializeBillsResponse(lease, response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      finishedCallback();
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const updateBill = (lease, bill, openSnackbar, finishedCallback) => {
    LeaseService.updateBill(lease.id, serializeBill(bill)).then(response => {
      deserializeBillsResponse(lease, response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      if (finishedCallback) { finishedCallback() }
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { lease, deserializeLease, saveLease, updateLease, deleteLease, saveFile, deleteFile, saveRenter, deleteRenter, deleteBill, saveBill, updateBill };

  return <SingleLeaseContext.Provider value={store}>{lease && children}</SingleLeaseContext.Provider>
}