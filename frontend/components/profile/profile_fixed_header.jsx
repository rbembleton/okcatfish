const React = require('react');
const LikeToggle = require('./like_toggle');
const MatchPercentage = require('./match_percentage');
const NewMessageForm = require('../messages/new_message_form');

const ProfileFixedHeader = React.createClass({

  render () {
    return(
      <div className="profile-fixed-header" style={this.props.style}>
        <div className="fixed-center-cont">
          <div className="profile-pic-container round-pic-cont ">
            <img className="round-pic-img"
            src={this.props.user.prof_pic.url}/>
          </div>
          <div className="profile-vitals">
            <h1>{this.props.user.username}</h1>
            <h2>{this.props.user.age} &#8729; {this.props.user.gender} &#8729; {this.props.user.loc_desc}</h2>
            <MatchPercentage matchPercentage={this.props.user.match_percentage} />
          </div>
          <div className="profile-new-message-form white-container">
            <NewMessageForm
              recipient_id={this.props.user.id}
            />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ProfileFixedHeader;
