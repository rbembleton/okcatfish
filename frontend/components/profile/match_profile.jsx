const React = require('react');
const ProfileConstants = require('../../constants/profile_constants');
const MatchProfileText = require('./match_profile_text');
const LookingFor = require('./looking_for');
const ProfileHeader = require('./profile_header');
const SearchActions = require('../../actions/search_actions');
const ProfileActions = require('../../actions/profile_actions');
const MatchProfileStore = require('../../stores/match_profile_store');
const NewMessageForm = require('../messages/new_message_form');
const PhotosStore = require('../../stores/photos_store');
const PhotoCarousel = require('../photos/photo_carousel');

const MatchProfile = React.createClass({

  getInitialState() {
    return({user: {}, photos: []});
  },

  updateUser() {
    this.setState({user: MatchProfileStore.match()});
  },

  updatePhotos() {
    this.setState({photos: PhotosStore.all()});
  },

  componentDidMount() {
    this.profileListener = MatchProfileStore.addListener(this.updateUser);
    this.photoListener = PhotosStore.addListener(this.updatePhotos);
    SearchActions.getMatch(this.props.params.userId);
    ProfileActions.getUserPhotos(this.props.params.userId);
  },

  componentWillUnmount() {
    this.profileListener.remove();
    this.photoListener.remove();
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
        <PhotoCarousel
          photos={this.state.photos}
        />
      <div className="profile-new-message-form white-container">
          <NewMessageForm
            recipient_id={this.state.user.id}
          />
        </div>
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
      <div className="profile-container center-container">
        {toRender}
      </div>
    );

  }

});

module.exports = MatchProfile;
