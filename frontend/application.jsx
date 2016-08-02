const React = require('react');
const ReactDOM = require('react-dom');
const IndexPage = require('./components/index_page');
const UserProfile = require('./components/user_profile');
const SessionActions = require('./actions/session_actions');

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

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path="index" component={IndexPage}/>
      <Route path="user" component={UserProfile}/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  if(window.currentUser) {SessionActions.receiveCurrentUser(window.currentUser);}
  let root = document.getElementById('content');
  ReactDOM.render(router, root);
});
