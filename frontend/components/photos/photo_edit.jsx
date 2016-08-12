const React = require('react');
const ProfileActions = require('../../actions/profile_actions');
const SessionStore = require('../../stores/session_store');

const PhotoEdit = React.createClass({

  deletePhoto(e) {
    e.preventDefault();
    const cBool = confirm("Are you sure you want to delete this photo?");
    if (cBool) {
      ProfileActions.removeUserPhoto({
        photo_id: e.target.id,
        user_id: SessionStore.currentUser().id
      });
    }
  },

  updateProfilePic(e) {
    e.preventDefault();
    ProfileActions.updateProfilePic({
      photo_id: e.target.id,
      user_id: SessionStore.currentUser().id
    });
  },


  render () {


    const photoDisplay = this.props.photos.map((photo, idx) => {

      return (
        <div key={idx} className="user-edit-photos">

          <div className="edit-photo-container">
            <div className="photo-edit-buttons">
              <button
                className="white-button-w-green"
                value={photo.id}
                onClick={this.deletePhoto}>Delete</button>
              <button
                className="white-button-w-green"
                value={photo.id}
                onClick={this.makeProfilePic}>Make Profile Pic</button>
            </div>
            <img src={photo.url}/>
          </div>
        </div>);
    });



    return (
      <div>
        {photoDisplay}
      </div>
    );
  }
});

module.exports = PhotoEdit;
