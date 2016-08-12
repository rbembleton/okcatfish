const React = require('react');
const PhotosStore = require('../../stores/photos_store');
const SessionStore = require('../../stores/session_store');
const PhotoCarousel = require('../photos/photo_carousel');
const NewPhotoForm = require('../photos/new_photo_form');
const ProfileActions = require('../../actions/profile_actions');
const PhotoEdit = require('../photos/photo_edit');
const PhotoRepos = require('../photos/photo_repos');


const UserPhotos = React.createClass({

  getInitialState() {
    return({ photos: []});
  },

  componentDidMount() {
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

    return (
      <div className="profile-main">
        <PhotoCarousel photos={this.state.photos}/>
        <NewPhotoForm />
        <PhotoRepos />
        <PhotoEdit photos={this.state.photos}/>
      </div>
    );

  }

});

module.exports = UserPhotos;
