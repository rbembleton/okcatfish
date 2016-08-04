module.exports = {
  getMatches(data, successCallback) {
    $.ajax({
      method: "GET",
      url: "api/search",
      data: {search: data},
      success(resp) {
        successCallback(resp);
      }
    });
  },

  getMatch(id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/users/${id}`,
      success(resp) {
        successCallback(resp);
      }
    });
  }
};
