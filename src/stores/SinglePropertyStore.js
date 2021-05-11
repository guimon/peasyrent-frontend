import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import PropertyService from "../services/PropertyService";

export const SinglePropertyContext = React.createContext(null);

export default function SinglePropertyStore(props) {
  const { children, id } = props;
  const history = useHistory();
  const [property, setProperty] = useState();

  useEffect(() => {
    if (id) {
      PropertyService.loadProperty(id).then(response => {
        let { price } = response.data.data.attributes;
        if (price) { price = price / 100};
        setProperty({...response.data.data.attributes, price});
      }).catch(error => {
        ErrorHandlerHelper(error, history)
      });
    } else {
      setProperty({});
    }
  }, [id, history]);

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

  const deserializeProperty = (response) => {
    let { price } = response.data.data.attributes || undefined;
    if (price) { price = price / 100};
    setProperty({...removeEmpty(response.data.data.attributes), price});
  };

  const serializeProperty = (property) => {
    if (property.price) {
      return {...property, price: property.price * 100 };
    }
    return property;
  };

  function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
  }

  const store = { property, saveProperty, updateProperty, savePicture, deletePicture };

  return <SinglePropertyContext.Provider value={store}>{property && children}</SinglePropertyContext.Provider>
}