const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const ProfileConstants = require('../constants/profile_constants');

let _photos = [];

const PhotosStore = new Store (AppDispatcher);

function resetPhotos(photos) {
  _photos = photos;
}

PhotosStore.all = function () {
  return _photos.map((photo) => { return Object.assign({}, photo); });
};

PhotosStore.__onDispatch = function (payload) {
  console.log(payload);
  switch (payload.actionType) {
    case ProfileConstants.UPDATE_USER_PHOTOS:
      resetPhotos(payload.photos);
      break;
  }
  PhotosStore.__emitChange();

};

module.exports = PhotosStore;
