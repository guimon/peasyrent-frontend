import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import PropertyService from "../services/PropertyService";

export const PropertiesContext = React.createContext(null);

export default function PropertyStore(props) {
  const { children, advertised_only } = props;
  const history = useHistory();
  const [properties, setProperties] = useState();

  useEffect(() => {
    PropertyService.index(advertised_only || false).then(response => {
      setProperties(response.data.data.map((hash) => {return hash.attributes}));
    }).catch(error => { ErrorHandlerHelper(error, history) });
  }, [advertised_only, history]);

  const store = { properties };

  return <PropertiesContext.Provider value={store}>{properties && children}</PropertiesContext.Provider>
}