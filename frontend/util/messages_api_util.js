module.exports = {
  fetchAllThreads (userId, successCallback) {
    $.ajax({
      method: "GET",
      url: "api/messages",
      data: {messages: {user_id: userId}},
      success (resp) {
        successCallback(resp);
      },
      error (resp) {
      }
    });
  },

  fetchSingleThread (thread_id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/messages/${thread_id}`,
      success (resp) {
        successCallback(resp);
      },
      error (resp) {
      }
    });
  },

  sendNewMessage (data, successCallback) {
    $.ajax({
      method: "POST",
      url: "api/messages",
      data: {messages: data},
      success (resp) {
        successCallback(resp);
      },
      error (resp) {
      }
    });
  },

  updateThreadAsRead (thread_id, successCallback) {
    $.ajax({
      method: "PATCH",
      url: `api/messages/${thread_id}`,
      success (resp) {
        successCallback(resp);
      },
      error (resp) {
      }
    });
  }

};
