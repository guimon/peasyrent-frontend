import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import ErrorHandlerHelper from "../helpers/ErrorHandlerHelper";
import MessageService from "../services/MessageService";
import {openSnackbar} from "../components/Notifier";

export const MessagesContext = React.createContext(null);

export default function MessagesStore(props) {
  const { children, lease_id } = props;
  const history = useHistory();
  const [messages, setMessages] = useState();

  const loadMessages = () => {
    if (lease_id) {
      MessageService.loadMessages(lease_id).then(response => {
        setMessages(response.data.data.map((hash) => {return hash.attributes}));
      }).catch(error => {
        ErrorHandlerHelper(error, history)
      });
    } else {
      setMessages([]);
    }
  };

  useEffect(() => {
    loadMessages(lease_id);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lease_id]);

  const sendNewMessage = (message, image_path, loadingCallback) => {
    MessageService.sendNewMessage(lease_id, message, image_path).then(response => {
      setMessages(response.data.data.map((hash) => {return hash.attributes}));
      if (loadingCallback) {
        loadingCallback(false);
      }
    }).catch(error => {
      ErrorHandlerHelper(error, history, openSnackbar, 'Error loading data, please try again later!');
    });
  };

  const store = { messages, lease_id, loadMessages, sendNewMessage };

  return <MessagesContext.Provider value={store}>{messages && children}</MessagesContext.Provider>
}