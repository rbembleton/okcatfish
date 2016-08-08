const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const LikeConstants = require('../constants/like_constants');

let _myLikes = {};
let _myLikers = {};

const LikesStore = new Store(AppDispatcher);

function resetLikes(likes) {
  _myLikes = {};
  
  likes.forEach((like) => {
    _myLikes[like.user_to_id] = like;
  });
}

function resetLikers(likers) {
  _myLikers = {};

  likers.forEach((like) => {
    _myLikers[like.user_from_id] = like;
  });
}

function receiveLike(like) {
  _myLikes[like.user_to_id] = like;
}

function removeLike(like) {
  delete _myLikes[like.user_to_id];
}



LikesStore.allMyLikes = function () {
  return Object.keys(_myLikes).map((user_id) => {
    return Object.assign({}, _myLikes[user_id]);
  });
};

LikesStore.doesUserLike = function (user_id) {
  return (_myLikes[user_id] !== undefined);
};

LikesStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case (LikeConstants.RECEIVE_MY_LIKES):
      resetLikes(payload.likes);
      break;
    case (LikeConstants.RECEIVE_MY_LIKERS):
      resetLikers(payload.likers);
      break;
    case (LikeConstants.RECEIVE_LIKE):
      receiveLike(payload.like);
      break;
    case (LikeConstants.REMOVE_LIKE):
      removeLike(payload.like);
      break;
  }

  LikesStore.__emitChange();
};




module.exports = LikesStore;
