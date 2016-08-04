const React = require('react');
const ReactDOM = require('react-dom');
const IndexPage = require('./components/index_page');
const UserProfile = require('./components/profile/user_profile');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
const Landing = require('./components/landing');
const BrowseMatches = require('./components/browse_matches');
const MatchProfile = require('./components/profile/match_profile');

import { Router, Route, IndexRoute, hashHistory } from 'react-router';


const App = React.createClass({
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

const _ensureLoggedIn = function (nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/');
  }
};

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path="index" component={IndexPage}/>
      <Route path="home" component={Landing} onEnter={_ensureLoggedIn}>
        <Route path="user" component={UserProfile}/>
        <Route path="browse" component={BrowseMatches}/>
        <Route path="match/:userId" component={MatchProfile}/>
      </Route>
    </Route>
  </Router>
);


document.addEventListener("DOMContentLoaded", () => {
  if(window.currentUser) {SessionActions.receiveCurrentUser(window.currentUser);}
  let root = document.getElementById('content');
  ReactDOM.render(router, root);
});
