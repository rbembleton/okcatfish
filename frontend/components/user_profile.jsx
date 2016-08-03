const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const UserProfile = React.createClass({


  render () {
    return (
      <div>Hello, {SessionStore.currentUser().username}
      </div>
    );
  }

});

module.exports = UserProfile;
