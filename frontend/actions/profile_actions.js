const AppDispatcher = require('../dispatcher/dispatcher');
const ProfileApiUtil = require('../util/profile_api_util');
const ProfileConstants = require('../constants/profile_constants');

const ProfileActions = {
  editProfileText(data) {
    ProfileApiUtil.updateProfileText(data, ProfileActions.updateProfileText);
  },

  updateProfileText(resp) {
    AppDispatcher.dispatch({
      actionType: ProfileConstants.UPDATE_PROFILE_TEXT,
      profileText: resp
    });
  },

  addUserPhoto(data) {
    ProfileApiUtil.addUserPhoto(data, ProfileActions.updateUserPhotos);
  },

  addRepoPicLink(data) {
    ProfileApiUtil.addRepoPicLink(data, ProfileActions.updateUserPhotos);
  },

  removeUserPhoto(data) {
    ProfileApiUtil.removeUserPhoto(data, ProfileActions.updateUserPhotos);
  },

  updateProfilePic(data) {
    ProfileApiUtil.updateProfilePic(data, ProfileActions.updateUserPhotos);
  },

  getUserPhotos(id) {
    ProfileApiUtil.fetchUserPhotos(id, ProfileActions.updateUserPhotos);
  },

  updateUserPhotos(resp) {
    AppDispatcher.dispatch({
      actionType: ProfileConstants.UPDATE_USER_PHOTOS,
      photos: resp
    });
  },




};

module.exports = ProfileActions;
