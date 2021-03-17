import axios from 'axios/index';
import store2 from 'store2';
import { FullStoryAPI } from 'react-fullstory';

import Base from "./BaseService";
import UserService from "./UserService";

export const AuthService = {
  loggedIn,
  login,
  logout,
  signup,
  resetPassword,
  saveNewPassword,
};

export default AuthService;

function loggedIn() {
  return !!Base.getAuthToken();
}

function login(email, password) {
  let credentials = {
    withCredentials: true,
    user: {
      email: email,
      password: password
    }
  };

  return axios.post(Base.apiLocation() + "/user/login", credentials).then(response => {
    Base.setAuthToken(response.headers["authorization"]);
    UserService.setUser(response.data.data.attributes);

    let user = UserService.getUser();
    FullStoryAPI('identify', user.id.toString(), {
      displayName: user.name,
      email: user.email,
      timezone: user.timezone,
      preferred_locale: user.preferred_locale,
    });

    return response;
  })
}

function logout() {
  return axios.delete(Base.apiLocation() + '/user/logout', Base.getFullHeaders()).then(response => {
    UserService.clear();
    Base.deleteAuthToken();
    return response;
  });
}

function resetPassword(email) {
  let credentials = { user: { email: email } };

  return axios.post(Base.apiLocation() + '/user/password', credentials);
}

function saveNewPassword(password, token) {
  let credentials = {
    user: {
      email: store2.get('email'),
      password: password,
      password_confirmation: password,
      reset_password_token: token
    }
  };

  return axios.put(Base.apiLocation() + '/user/password', credentials);
}

function signup(name, email, password, invite) {
  let data = {
    user: {
      name,
      email,
      password,
      invite,
    }
  };

  return axios.post(Base.apiLocation() + "/user", data).then(response => {
    Base.setAuthToken(response.headers["authorization"]);
    UserService.setUser(response.data.data.attributes);
    store2.set('email', email);
    return response;
  });
}

