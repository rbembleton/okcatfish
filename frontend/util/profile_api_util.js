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

  addRepoPicLink (data, successCallback) {
    $.ajax({
      method: "POST",
      url: `api/photo_album_links`,
      data: {photo: data},
      success(resp) {
        successCallback(resp);
      }
    });
  },


  removeUserPhoto (data, successCallback) {
    $.ajax({
      method: "DELETE",
      url: `api/user_photos/0`, //dummy
      data: {user: data},
      success(resp) {
        successCallback(resp);
      }
    });
  },

  updateProfilePic (data, successCallback) {
    $.ajax({
      method: "PATCH",
      url: `api/user_photos/0`, //dummy
      data: {user: data},
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
