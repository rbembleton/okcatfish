const React = require('react');
const SearchApiUtil = require('../util/search_api_util');
const AppDispatcher = require('../dispatcher/dispatcher');
const SearchConstants = require('../constants/search_constants');

const SearchActions = {
  getMatches(data) {
    SearchApiUtil.getMatches(data, SearchActions.processMatches);
  },

  processMatches(resp) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.GET_MATCHES,
      users: resp
    });
  },

  getMatch(id) {
    SearchApiUtil.getMatch(id, SearchActions.processMatch);
  },

  processMatch(resp) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.GET_MATCH,
      match: resp
    });
  }

};

module.exports = SearchActions;
