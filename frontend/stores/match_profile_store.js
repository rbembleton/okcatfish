const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SearchConstants = require('../constants/search_constants');

let _match = {};

const MatchProfileStore = new Store (AppDispatcher);

function resetMatch(match) {
  _match = match;
}

MatchProfileStore.match = function () {
  return Object.assign({}, _match);
};

MatchProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SearchConstants.GET_MATCH:
      resetMatch(payload.match);
      break;
  }
  MatchProfileStore.__emitChange();

};

module.exports = MatchProfileStore;
