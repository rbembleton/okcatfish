module.exports = {
  getRepos(successCallback) {
    $.ajax({
      method: "GET",
      url: `api/photo_repos`,
      success(resp) {
        successCallback(resp);
      }
    });
  },
  getRepo(id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/photo_repos/${id}`,
      success(resp) {
        successCallback(resp);
      }
    });
  }
};
