import rollbar from "./Rollbar";

import BaseService from "../services/BaseService";
import Routes from "../constants/Routes";

const errorHandler = (error, history, flashFn, errorMessage, redirectRoute) => {
  if (error.response && error.response.status === 401) {
    BaseService.deleteAuthToken();
    history.push(Routes.login);
  } else {
    window.err = error;

    if (error.config) {
      rollbar.error("Failure on: " + error.config.url, error);
    } else {
      rollbar.error("Client failure on: " + history.location, error);
    }

    if (flashFn && errorMessage) {
      window.fff = flashFn;
      flashFn({
        message: errorMessage,
        variant: 'error',
        timeout: 5000
      });
    }

    if (redirectRoute) { history.push(redirectRoute) }
  }
}

export default errorHandler;