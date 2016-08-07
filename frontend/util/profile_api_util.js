module.exports = {
  updateProfileText (data, successCallback) {
    $.ajax({
      method: "PATCH",
      url: `api/profile_texts/${data.id}`,
      data: {profile_text: {text_type: data.textType, text: data.text}},
      success(resp) {
        successCallback(resp);
      }
    });
  },

  addUserPhoto (data, successCallback) {
    $.ajax({
      method: "POST",
      url: `api/user_photos`,
      dataType: "json",
      contentType: false,
      processData: false,
      data: data,
      success(resp) {
        successCallback(resp);
      }
    });
  },

  fetchUserPhotos (id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/user_photos`,
      dataType: "json",
      data: {user: {user_id: id}},
      success(resp) {
        successCallback(resp);
      }
    });
  }
};
