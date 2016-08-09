module.exports = {
  createResponse (data, successCallback) {
    $.ajax({
      method: "POST",
      url: 'api/user_responses',
      dataType: "json",
      data: {response: data},
      success(resp) {
        successCallback(resp);
      }
    });
  },

  updateResponse (id, data, successCallback) {
    $.ajax({
      method: "PATCH",
      url: `api/user_responses/${id}`,
      dataType: "json",
      data: {response: data},
      success(resp) {
        successCallback(resp);
      }
    });
  },

  fetchSingleResponse (id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/user_responses/${id}`,
      success(resp) {
        successCallback(resp);
      }
    });
  },

  fetchAllResponses (user_id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/user_responses`,
      dataType: "json",
      data: {response: {user_id: user_id}},
      success(resp) {
        successCallback(resp);
      }
    });
  },

  fetchNext20Questions (user_id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/questions`,
      dataType: "json",
      data: {question: {user_id: user_id}},
      success(resp) {
        successCallback(resp);
      }
    });
  },

  fetchSingleQuestion (id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/questions/${id}`,
      success(resp) {
        successCallback(resp);
      }
    });
  },

};
