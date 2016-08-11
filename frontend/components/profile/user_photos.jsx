const React = require('react');
const PhotosStore = require('../../stores/photos_store');
const PhotoCarousel = require('../photos/photo_carousel');
const NewPhotoForm = require('../photos/new_photo_form');
const ProfileActions = require('../../actions/profile_actions');


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
      </div>
    );

  }

});

module.exports = UserPhotos;
