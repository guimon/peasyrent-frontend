import store2 from 'store2';
import moment from 'moment';

export const BaseService = {
  setAuthToken,
  getAuthToken,
  deleteAuthToken,
  getFullHeaders,
  apiLocation,
};

export default BaseService;

function apiLocation() {
  return process.env.REACT_APP_API_HOST;
}

function setAuthToken(auth_token) {
  store2.set("Authorizarion", auth_token);
  store2.set("AuthorizedAt", moment().utc().format());
}

function getAuthToken() {
  let token = store2.get("Authorizarion");
  let tokenDate = store2.get("AuthorizedAt");
  if (tokenDate && moment(tokenDate).add(1, 'day') < moment()) {
    deleteAuthToken();
    return null;
  } else {
    return token;
  }
}

function deleteAuthToken() {
  store2.remove("Authorizarion");
  store2.remove("AuthorizedAt");
}

function getAuthTokenHeader() {
  return {"Authorization": getAuthToken()};
}

function getFullHeaders() {
  return { headers: {...getAuthTokenHeader() } };
}