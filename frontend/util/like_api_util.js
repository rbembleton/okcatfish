module.exports = {
  get_user_likes(user_id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/likes`,
      data: {like: {user_from_id: user_id}},
      success: (resp) => {
        successCallback(resp);
      }
    });
  },

  get_user_likers(user_id, successCallback) {
    $.ajax({
      method: "GET",
      url: `api/likes`,
      data: {like: {user_to_id: user_id}},
      success: (resp) => {
        successCallback(resp);
      }
    });
  },

  create_like(from_id, to_id, successCallback) {
    $.ajax({
      method: "POST",
      url: `api/likes`,
      data: {like: {user_from_id: from_id, user_to_id: to_id}},
      success: (resp) => {
        successCallback(resp);
      }
    });
  },

  remove_like(from_id, to_id, successCallback) {
    $.ajax({
      method: "DELETE",
      url: `api/likes/0`, //This is a dummy
      data: {like: {user_from_id: from_id, user_to_id: to_id}},
      success: (resp) => {
        successCallback(resp);
      }
    });

  }


};
