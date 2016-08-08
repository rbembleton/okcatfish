const AppDispatcher = require('../dispatcher/dispatcher');
const LikeApiUtil = require('../util/like_api_util');
const LikeConstants = require('../constants/like_constants');


const LikeActions = {

  getMyLikes(id) {
    LikeApiUtil.get_user_likes(id, LikeActions.receiveMyLikes);
  },

  getMyLikers(id) {
    LikeApiUtil.get_user_likers(id, LikeActions.receiveMyLikers);
  },

  like(from_id, to_id) {
    LikeApiUtil.create_like(from_id, to_id, LikeActions.receiveLike);
  },

  unlike(from_id, to_id) {
    LikeApiUtil.remove_like(from_id, to_id, LikeActions.removeLike);
  },

  receiveMyLikes(resp) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.RECEIVE_MY_LIKES,
      likes: resp
    });
  },

  receiveMyLikers(resp) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.RECEIVE_MY_LIKERS,
      likes: resp
    });
  },

  receiveLike(resp) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.RECEIVE_LIKE,
      like: resp
    });
  },

  removeLike(resp) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.REMOVE_LIKE,
      like: resp
    });
  }

};

module.exports = LikeActions;
