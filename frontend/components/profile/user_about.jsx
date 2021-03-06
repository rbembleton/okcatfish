const React = require('react');
const SessionStore = require('../../stores/session_store');
const ProfileConstants = require('../../constants/profile_constants');
const UserProfileText = require('./user_profile_text');
const LookingFor = require('./looking_for');

const UserAbout = React.createClass({


  render () {
    let currentUser = SessionStore.currentUser() || {};

    const profileTexts = Object.keys(ProfileConstants.PROFILE_TEXTS).map((el, i) => {
      return (
        <UserProfileText
          key={i}
          textType={el}
          text={currentUser.profile_text[el]}
          id={currentUser.profile_text.id}
        />
      );
    });

    return (
      <div className="profile-main">
        <div className="profile-text">
          {profileTexts}
        </div>
        <LookingFor user={currentUser}/>
      </div>
    );

  }

});

module.exports = UserAbout;
