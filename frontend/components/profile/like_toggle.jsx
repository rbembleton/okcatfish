const React = require('react');
const LikesStore = require('../../stores/likes_store');
const LikeActions = require('../../actions/like_actions');
const SessionStore = require('../../stores/session_store');

const LikeToggle = React.createClass({

  getInitialState () {
    return ({ liked: LikesStore.doesUserLike(this.props.matchId) });
  },

  componentDidMount () {
    this.likeListener = LikesStore.addListener(this.verifyLikeState);
  },

  componentWillUnmount () {
    this.likeListener.remove();
  },

  toggleLike (e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.liked) {
      LikeActions.unlike(SessionStore.currentUser().id, this.props.matchId);
    } else {
      LikeActions.like(SessionStore.currentUser().id, this.props.matchId);
    }
    this.switchLikeState();
  },

  verifyLikeState () {
    const currentState = LikesStore.doesUserLike(this.props.matchId);
    if (currentState !== this.state.liked) {
      this.setState({ liked: currentState });
    }
  },

  switchLikeState() {
    this.setState({ liked: (this.state.liked ? false : true) });
  },

  render () {
    const thisClass = (
      "like-button " + (this.state.liked ? "liked-state" : "unliked-state")
    );

    return(

      <div className="profile-search-like-box">
        <button
          name="like-toggle"
          className={thisClass}
          onClick={this.toggleLike}
        >{this.state.liked ? `★` : `☆`}</button>
      </div>

      );

  }


});

module.exports = LikeToggle;
