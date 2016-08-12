const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const PhotoRepoConstants = require('../constants/photo_repo_constants');

let _photoRepos = {};
let _photoRepo = {};

const PhotoReposStore = new Store (AppDispatcher);

function resetPhotoRepos(photoRepos) {
  _photoRepos = {};
  photoRepos.forEach((repo) => {
    _photoRepos[repo.id] = repo;
  });
}

PhotoReposStore.all = function () {
  return Object.keys(_photoRepos).map((repoId) => {
    return Object.assign({}, _photoRepos[repoId]);
  });
};

PhotoReposStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PhotoRepoConstants.GET_PHOTO_REPOS:
      resetPhotoRepos(payload.photoRepos);
      break;
    case PhotoRepoConstants.GET_PHOTO_REPO:
      resetPhotoRepo(payload.photoRepo);
      break;
  }
  PhotoReposStore.__emitChange();

};

module.exports = PhotoReposStore;
