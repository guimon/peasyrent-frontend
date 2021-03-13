import store2 from 'store2';

export const UserService = {
  getUser,
  setUser,
  clear,
};

export default UserService;

function getUser() {
  return store2.get("user");
}

function setUser(user) {
  return store2.set("user", user);
}

function clear() {
  return store2.remove("user");
}
