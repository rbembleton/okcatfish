const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const SessionApiUtil = require('../util/session_api_util');
const ErrorActions = require('./error_actions');
const AuthFormConstants = require('../constants/auth_form_constants');

const SessionActions = {
  signUp (data) {
    SessionApiUtil.signUp(data, SessionActions.receiveCurrentUser, ErrorActions.setErrors, AuthFormConstants.SIGN_UP_FORM);
  },

  logIn (data) {
    SessionApiUtil.logIn(data, SessionActions.receiveCurrentUser, ErrorActions.setErrors, AuthFormConstants.LOG_IN_FORM);
  },

  logOut () {
    SessionApiUtil.logOut(SessionActions.removeCurrentUser, ErrorActions.setErrors);
  },

  receiveCurrentUser (user) {
    ErrorActions.clearErrors();
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOG_IN,
      user: user
    });
  },

  removeCurrentUser (user) {
    ErrorActions.clearErrors();
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOG_OUT,
    });
  }
};

module.exports = SessionActions;
