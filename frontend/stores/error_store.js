const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const ErrorConstants = require('../constants/error_constants');

let _errors = [];
let _form = "";

const ErrorStore = new Store(AppDispatcher);

const _setErrors = function (form, errors) {
  _form = form;
  _errors = errors;
  ErrorStore.__emitChange();
};

const _clearErrors = function () {
  _errors = [];
  _form = "";
  ErrorStore.__emitChange();
};

ErrorStore.errors = function (form) {
  if (form && form === _form) { return _errors.slice(); }
  return [];
};

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      _setErrors(payload.form, payload.errors);
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _clearErrors();
      break;
  }
};

module.exports = ErrorStore;
