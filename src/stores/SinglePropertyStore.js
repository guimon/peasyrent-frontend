import React, {useEffect, useState, useCallback} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import PropertyService from "../services/PropertyService";

export const SinglePropertyContext = React.createContext(null);

export default function SinglePropertyStore(props) {
  const { children, id } = props;
  const history = useHistory();
  const [property, setProperty] = useState();

  function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
  }

  const deserializeProperty = useCallback((response) => {
    if (response) {
      let {price} = response.data.data.attributes || undefined;
      if (price) {
        price = price / 100
      }
      setProperty({...removeEmpty(response.data.data.attributes), price});
    }
  }, []);

  const serializeProperty = (property) => {
    let { price } = property;
    if (price) { price = price * 100 }
    return {...property, price };
  };

  useEffect(() => {
    if (id) {
      PropertyService.loadProperty(id).then(response => {
        deserializeProperty(response);
      }).catch(error => {
        ErrorHandlerHelper(error, history)
      });
    } else {
      setProperty({ state: '', stripe_account_id: '', active: ''});
    }
  }, [id, history, deserializeProperty]);

  const saveProperty = (property, openSnackbar) => {
    PropertyService.saveProperty(serializeProperty(property)).then(response => {
      deserializeProperty(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const updateProperty = (property, openSnackbar) => {
    PropertyService.updateProperty(serializeProperty(property)).then(response => {
      deserializeProperty(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const deleteProperty = (property, openSnackbar, callback) => {
    PropertyService.deleteProperty(property).then(response => {
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      if (callback) {
        callback();
      }
    }).catch(error => {
      let errorMessage = error.response.data.error || "Request failed, please try again later!";
      ErrorHandlerHelper(error, history, openSnackbar, errorMessage)
    });
  };

  const deletePicture = (propertyId, pictureId, openSnackbar) => {
    PropertyService.deletePicture(propertyId, pictureId).then(response => {
      deserializeProperty(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const savePicture = (propertyId, path, openSnackbar, finishedCallback) => {
    PropertyService.savePicture(propertyId, path).then(response => {
      deserializeProperty(response);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
      finishedCallback();
    }).catch(error => {
      finishedCallback();
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { property, saveProperty, updateProperty, deleteProperty, savePicture, deletePicture };

  return <SinglePropertyContext.Provider value={store}>{property && children}</SinglePropertyContext.Provider>
}