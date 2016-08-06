const React = require('react');
const SessionStore = require('../../stores/session_store');
const ProfileActions = require('../../actions/profile_actions');
// const hashHistory = require('react-router').hashHistory;

const NewPhotoForm = React.createClass({

  getInitialState () {
    return ({ imageFile: null, imageUrl: "" });
  },

  componentDidMount () {

  },

  componentWillUnmount () {

  },


  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user[image]", this.state.imageFile);
    formData.append("user[user_id]", SessionStore.currentUser().id);
    ProfileActions.addUserPhoto(formData);

  },

  updateFile(e) {

    let file = e.currentTarget.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ imageFile: null, imageUrl: "" });
    }
  },


  render () {

    return (
      <div className="add-photo-form">
        <img src={this.state.imageUrl} className="image-preview"/>
        <form onSubmit={this.handleSubmit}>


          <input
            className="file-upload"
            type="file"
            onChange={this.updateFile}
          />

          <input
            className="submit-photo-button"
            type="submit"
            value="Upload"
          />
        </form>

      </div>
    );
  }

});

module.exports = NewPhotoForm;
