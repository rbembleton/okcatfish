const React = require('react');
const PhotoRepoApiUtil = require('../util/photo_repo_api_util');
const AppDispatcher = require('../dispatcher/dispatcher');
const PhotoRepoConstants = require('../constants/photo_repo_constants');

const PhotoRepoActions = {
  getAllPhotoRepos() {
    PhotoRepoApiUtil.getRepos(PhotoRepoActions.receiveRepos);
  },

  receiveRepos(resp) {
    AppDispatcher.dispatch({
      actionType: PhotoRepoConstants.GET_PHOTO_REPOS,
      photoRepos: resp
    });
  },

  getSinglePhotoRepo(id) {
    PhotoRepoApiUtil.getRepo(id, PhotoRepoActions.receiveRepo);
  },

  receiveRepo(resp) {
    AppDispatcher.dispatch({
      actionType: PhotoRepoConstants.GET_PHOTO_REPO,
      photoRepo: resp
    });
  },

};

module.exports = PhotoRepoActions;
