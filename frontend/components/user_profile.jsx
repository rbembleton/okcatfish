const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const UserProfile = React.createClass({

  logOutClick (e) {
    e.preventDefault();
    SessionActions.logOut();
  },

  render () {
    return (
      <div>Hello, {SessionStore.currentUser().username}
        <br></br>
        <input type="button" onClick={this.logOutClick} value="Log Out"/>
      </div>
    );
  }

});

module.exports = UserProfile;
