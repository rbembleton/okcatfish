const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const MessagesActions = require('../../actions/messages_actions');
const ProfileConstants = require('../../constants/profile_constants');
const UserProfileText = require('./user_profile_text');
const LookingFor = require('./looking_for');
const ProfileHeader = require('./profile_header');
const NewPhotoForm = require('../photos/new_photo_form');
const PhotosStore = require('../../stores/photos_store');
const PhotoCarousel = require('../photos/photo_carousel');
const ProfileActions = require('../../actions/profile_actions');
const UserResponses = require('../questions/user_responses');
const AnswerQuestions = require('../questions/answer_questions');

const UserProfile = React.createClass({

  getInitialState() {
    return({photos: []});
  },

  componentDidMount() {
    MessagesActions.getAllThreads(SessionStore.currentUser().id); // optimize thread loading
    this.photoListener = PhotosStore.addListener(this.updatePhotos);
    ProfileActions.getUserPhotos(SessionStore.currentUser().id);
  },

  componentWillUnmount() {
    this.photoListener.remove();
  },

  updatePhotos() {
    this.setState({photos: PhotosStore.all()});
  },

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
      <div className="profile-container center-container">
        <ProfileHeader user={currentUser}/>
          <PhotoCarousel
            photos={this.state.photos}
          />
        <NewPhotoForm />
        <div className="profile-main">
          <div className="profile-text">
            {profileTexts}
          </div>
          <LookingFor user={currentUser}/>
        </div>

        <AnswerQuestions />
      </div>
    );

  }

});

module.exports = UserProfile;
