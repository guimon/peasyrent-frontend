import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import PropertyService from "../services/PropertyService";

export const PropertiesContext = React.createContext(null);

export default function PropertyStore(props) {
  const { children, vacant_only } = props;
  const history = useHistory();
  const [properties, setProperties] = useState();

  useEffect(() => {
    PropertyService.index(vacant_only).then(response => {
      setProperties(response.data.data.map((hash) => {return hash.attributes}));
    }).catch(error => { ErrorHandlerHelper(error, history) });
  }, [vacant_only, history]);

  const deleteProperty = (id, openSnackbar) => {
    PropertyService.deleteProperty(id).then(response => {
      let index = properties.findIndex(p => p.id === id);
      setProperties(state => state.splice(index, 1));
      openSnackbar({message: "Success!", variant: 'success', timeout: 3000});
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, "Request failed, please try again later!")
    });
  };

  const store = { properties, deleteProperty };

  return <PropertiesContext.Provider value={store}>{properties && children}</PropertiesContext.Provider>
}