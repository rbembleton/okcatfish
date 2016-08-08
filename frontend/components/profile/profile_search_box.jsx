const React = require('react');
const hashHistory = require('react-router').hashHistory;
const LikeToggle = require('./like_toggle');

const ProfileSearchBox = React.createClass({

  showProfile() {
    hashHistory.push(`home/match/${this.props.user.id}`);
  },

  render () {
    return(
      <div className="profile-search-box white-container"
          onClick={this.showProfile}>
        <div className="profile-search-pic-container">
          <img src={this.props.user.prof_pic.url}/>
        </div>
        <div className="profile-search-vitals">
          <h1>{this.props.user.username}</h1>
          <h3>{this.props.user.age} &#8729; {this.props.user.gender}</h3>
          <h2>{this.props.user.loc_desc}</h2>
        </div>
        <LikeToggle matchId={this.props.user.id}/>
      </div>
    );
  }

});

module.exports = ProfileSearchBox;
