const React = require('react');
const ProfileConstants = require('../../constants/profile_constants');
const MatchProfileText = require('./match_profile_text');
const LookingFor = require('./looking_for');
const ProfileHeader = require('./profile_header');
const SearchActions = require('../../actions/search_actions');
const MatchProfileStore = require('../../stores/match_profile_store');

const MatchProfile = React.createClass({

  getInitialState() {
    return({user: {}});
  },

  updateUser() {
    this.setState({user: MatchProfileStore.match()});
  },

  componentDidMount() {
    this.profileListener = MatchProfileStore.addListener(this.updateUser);
    SearchActions.getMatch(this.props.params.userId);
  },

  componentWillUnmount() {
    this.profileListener.remove();
  },

  profileTexts() {
    return (Object.keys(ProfileConstants.PROFILE_TEXTS).map((el, i) => {
      return (
        <MatchProfileText
          key={i}
          textType={el}
          text={this.state.user.profile_text[el]}
          id={this.state.user.profile_text.id}
        />
      );
    }));
  },


  render () {

    const toRender = (this.state.user.id) ? (
      <div>
        <ProfileHeader user={this.state.user}/>
        <div className="profile-main">
          <div className="profile-text">
            {this.state.user ? this.profileTexts() : []}
          </div>
          <LookingFor user={this.state.user}/>
        </div>
      </div>
    ) : (
      <div></div>
    );

    return (
      <div className="profile-container">
        {toRender}
      </div>
    );

  }

});

module.exports = MatchProfile;
