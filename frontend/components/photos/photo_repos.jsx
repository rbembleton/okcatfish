const React = require('react');
const Modal = require('react-modal');
const PhotoReposStore = require('../../stores/photo_repos_store');
const PhotoRepoActions = require('../../actions/photo_repo_actions');
const SingleRepo = require('./single_repo');

const PhotoRepos = React.createClass({

  getInitialState () {
    return({show: this.props.show, repos: PhotoReposStore.all() });
  },

  closeModal () {
    this.setState({ show: false });
  },
  openModal (e) {
    e.preventDefault();
    this.setState({ show: true });
  },

  componentDidMount () {
    PhotoRepoActions.getAllPhotoRepos();
    this.repoListener = PhotoReposStore.addListener(this.updateRepos);
  },

  componentWillUnmount () {
    this.repoListener.remove();
  },

  updateRepos () {
    this.setState({ repos: PhotoReposStore.all() });
  },


  render() {

    const modalStyle = {
      overlay : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 10
      },
      content : {
        position: 'fixed',
        top: '100px',
        left: '150px',
        right: '150px',
        bottom: '100px',
        border: 'none',
        padding: '20px',
        zIndex: 11,
        background: 'transparent'
      }
    };

    const reposDisplay = this.state.repos ? this.state.repos.map((repo, idx) => {
      return (
        <div key={idx} className="modal-repos-display">
          <SingleRepo repo={repo}/>
        </div>);
    }) : (<div></div>) ;



    return (
      <div>
        <button
          className="view-photo-button"
          onClick={this.openModal}>
            Add Photos From OKCatfish Celebrity Photo Libraries
        </button>
        <Modal
          isOpen={this.state.show}
          onRequestClose={this.closeModal}
          style={modalStyle}>
            {reposDisplay}
        </Modal>
      </div>
    );
  }
});

module.exports = PhotoRepos;
