const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

let _currentUser = {};

const SessionStore = new Store (AppDispatcher);

const _logIn = function (user) {
  _currentUser = user;
  console.log("login");
  SessionStore.__emitChange();
};

const _logOut = function () {
  _currentUser = {};
  console.log("logout");
  SessionStore.__emitChange();
};

SessionStore.currentUser = function () {
  return Object.assign({}, _currentUser);
};

SessionStore.isUserLoggedIn = function () {
  return (_currentUser.id !== undefined);
};

SessionStore.__onDispatch = function (payload) {
  console.log(payload);
  switch (payload.actionType) {
    case SessionConstants.LOG_IN:
      _logIn(payload.user);
      break;
    case SessionConstants.LOG_OUT:
      _logOut();
      break;
  }
};

module.exports = SessionStore;
