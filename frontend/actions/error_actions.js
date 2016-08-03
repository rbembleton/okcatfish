const ErrorConstants = require('../constants/error_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

const ErrorActions = {
  setErrors(resp, form) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      errors: resp,
      form: form
    });
  },

  clearErrors(resp) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS
    });
  }

};

module.exports = ErrorActions;
