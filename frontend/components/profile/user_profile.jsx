const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const MessagesActions = require('../../actions/messages_actions');
const ProfileConstants = require('../../constants/profile_constants');
const UserProfileText = require('./user_profile_text');
const ProfileHeader = require('./profile_header');
const UserPhotos = require('./user_photos');
const UserAbout = require('./user_about');
const UserQuestions = require('./user_questions');

const UserProfile = React.createClass({

  getInitialState() {
    return({ whichChild: 'about' });
  },

  updateChild(e) {
    this.setState({whichChild: e.target.id});
  },

  render () {
    let currentUser = SessionStore.currentUser() || {};
    const currChild = (
      this.state.whichChild === 'about' ?
        <UserAbout /> :
        (
          this.state.whichChild === 'photos' ?
            <UserPhotos /> :
            <UserQuestions />
        )
    );


    return (
      <div className="profile-container center-container">
        <ProfileHeader user={currentUser}/>
        <div className="select-user-page clearfix">
          <ul>
            <li
              id='about'
              className={this.state.whichChild === 'about' ? "selected-user-page" : ""}
              onClick={this.updateChild}>About</li>
            <li
              id='photos'
              className={this.state.whichChild === 'photos' ? "selected-user-page" : ""}
              onClick={this.updateChild}>Photos</li>
            <li
              id='questions'
              className={this.state.whichChild === 'questions' ? "selected-user-page" : ""}
              onClick={this.updateChild}>Questions</li>
          </ul>
        </div>
        {currChild}
      </div>
    );

  }

});

module.exports = UserProfile;
