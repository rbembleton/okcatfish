const React = require('react');
const SessionStore = require('../../stores/session_store');
const ProfileConstants = require('../../constants/profile_constants');
const UserProfileText = require('./user_profile_text');
const LookingFor = require('./looking_for');
const MatchProfileText = require('./match_profile_text');


const UserAbout = React.createClass({

  profileTexts() {
    return (Object.keys(ProfileConstants.PROFILE_TEXTS).map((el, i) => {
      return (
        <MatchProfileText
          key={i}
          textType={el}
          text={this.props.user.profile_text[el]}
          id={this.props.user.profile_text.id}
        />
      );
    }));
  },

  render () {

    return (
      <div className="profile-main">
        <div className="profile-text">
          {this.props.user ? this.profileTexts() : []}
        </div>
        <LookingFor user={this.props.user}/>
      </div>
    );

  }

});

module.exports = UserAbout;
