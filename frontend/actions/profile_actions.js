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
  }


};

module.exports = ProfileActions;
