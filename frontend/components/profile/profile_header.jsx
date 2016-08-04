const React = require('react');

const ProfileHeader = React.createClass({

  render () {
    return(
      <div className="profile-header">
        <div className="profile-pic-container">
          <img src={this.props.user.prof_pic.url}/>
        </div>
        <div className="profile-vitals">
          <h1>{this.props.user.username}</h1>
          <h2>{this.props.user.age} &#8729; {this.props.user.gender} &#8729; {this.props.user.location}</h2>
        </div>
      </div>
    );
  }

});

module.exports = ProfileHeader;
