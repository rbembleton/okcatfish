const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SearchConstants = require('../constants/search_constants');

let _matches = {};
const SearchStore = new Store(AppDispatcher);

function resetMatches(users) {
  _matches = {};
  users.forEach((user) => {
    _matches[user.id] = user;
  });
}

SearchStore.all = function () {
  return Object.keys(_matches).map((userId) => {
    return Object.assign({}, _matches[userId]);
  });
};

SearchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case(SearchConstants.GET_MATCHES):
      resetMatches(payload.users);
      break;
  }
  this.__emitChange();
};



module.exports = SearchStore;
