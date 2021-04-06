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
        setProperty(response.data.data.attributes);
      }).catch(error => {
        ErrorHandlerHelper(error, history)
      });
    } else {
      setProperty({});
    }
  }, [id, history]);

  const saveProperty = (property, openSnackbar) => {
    PropertyService.saveProperty(property).then(response => {
      setProperty(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const updateProperty = (property, openSnackbar) => {
    PropertyService.updateProperty(property).then(response => {
      setProperty(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const deletePicture = (propertyId, pictureId, openSnackbar) => {
    PropertyService.deletePicture(propertyId, pictureId).then(response => {
      setProperty(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const savePicture = (propertyId, path, openSnackbar) => {
    PropertyService.savePicture(propertyId, path).then(response => {
      setProperty(response.data.data.attributes);
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { property, saveProperty, updateProperty, savePicture, deletePicture };

  return <SinglePropertyContext.Provider value={store}>{property && children}</SinglePropertyContext.Provider>
}