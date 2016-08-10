const React = require('react');
const LikeToggle = require('./like_toggle');
const MatchPercentage = require('./match_percentage');

const ProfileHeader = React.createClass({

  render () {
    return(
      <div className="profile-header">
        <div className="profile-pic-container round-pic-cont">
          <img className="round-pic-img"
          src={this.props.user.prof_pic.url}/>
        </div>
        <div className="profile-vitals">
          <h1>{this.props.user.username}</h1>
          <h2>{this.props.user.age} &#8729; {this.props.user.gender} &#8729; {this.props.user.loc_desc}</h2>
        </div>
        {this.props.showLikeBox ?
          <div className="profile-like-toggle">
            If you like what you see...
            <LikeToggle matchId={this.props.user.id}/>
            <MatchPercentage matchPercentage={this.props.user.match_percentage} />
          </div>  : ""
        }
      </div>
    );
  }

});

module.exports = ProfileHeader;
