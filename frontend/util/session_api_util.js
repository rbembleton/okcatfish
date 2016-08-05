module.exports = {
  signUp (data, successCallback, errorCallback, form) {
    $.ajax({
      method: "POST",
      url: "api/users",
      data: {user: data},
      success (resp) {
        successCallback(resp);
      },
      error (resp) {
        errorCallback(resp.responseJSON, form);
      }
    });
  },

  logIn (data, successCallback, errorCallback, form) {
    $.ajax({
      method: "POST",
      url: "api/session",
      data: {user: data},
      success (resp) {
        successCallback(resp);
      },
      error (resp) {
        errorCallback(resp.responseJSON, form) ;
      }
    });
  },

  guestLogIn (successCallback, errorCallback, form) {
    $.ajax({
      method: "POST",
      url: "api/session",
      data: {user: {username: "pro_catfisher", password: "okcatfish"}},
      success (resp) {
        successCallback(resp);
      },
      error (resp, form) {
        errorCallback(resp.responseJSON, form);
      }
    });
  },

  logOut (successCallback, errorCallback) {
    $.ajax({
      method: "DELETE",
      url: "api/session",
      success (resp) {
        successCallback(resp);
      },
      error (resp) {
        errorCallback(resp.responseJSON);
      }
    });
  },

};
