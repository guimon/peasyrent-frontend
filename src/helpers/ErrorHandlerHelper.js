import BaseService from "../services/BaseService";
import RouteConstants from "../RouteConstants";

const errorHandler = (error, history, flashFn, errorMessage, redirectRoute) => {
  if (history && error.response && error.response.status === 401) {
    BaseService.deleteAuthToken();
    history.push(RouteConstants.login);
  } else {
    window.err = error;

    // if (error.config) {
    //   rollbar.error("Failure on: " + error.config.url, error);
    // } else {
    //   rollbar.error("Client failure: " + (history ? history.location : ''), error);
    // }

    if (flashFn && errorMessage) {
      window.fff = flashFn;
      flashFn({
        message: errorMessage,
        variant: 'error',
        timeout: 5000
      });
    }

    if (history && redirectRoute) { history.push(redirectRoute) }
  }
}

export default errorHandler;