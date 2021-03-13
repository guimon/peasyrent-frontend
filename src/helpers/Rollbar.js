import Rollbar from 'rollbar';

var rollbar = new Rollbar({
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
});

export default rollbar;