const React = require('react');
const ProfileActions = require('../../actions/profile_actions');
const SessionStore = require('../../stores/session_store');

const SingleRepo = React.createClass({

  handleAdd (e) {
    e.preventDefault();
    ProfileActions.addRepoPicLink({
      repo_pic_id: e.target.value,
      user_id: SessionStore.currentUser().id
    });
  },

  render () {

    const dispImages = this.props.repo.pics.map((photo, idx) => {
      return (
        <div className='single-repo-photo' key={idx}>
          <img src={photo.url} />
          <button
            onClick={this.handleAdd}
            className="white-button-w-green"
            value={photo.id}>Add Photo</button>
        </div>
      );
    });

    return(
      <div className="single-photo-repo">
        {this.props.repo.label + ": "}<br/>
        {dispImages}
      </div>
    );
  }

});

module.exports = SingleRepo;
