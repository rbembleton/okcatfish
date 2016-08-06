const React = require('react');
const hashHistory = require('react-router').hashHistory;

const MessageProfileHeader = React.createClass({

  goToUser(e) {
    e.preventDefault();
    hashHistory.push(`home/match/${this.props.user.id}`);
  },

  render () {
    let display;
    if (this.props.user) {
      display = (
        <div className="thread-profile-header">
          <div className="thread-profile-pic-container">
            <img src={this.props.user ? this.props.user.prof_pic.url : ""}/>
          </div>
          <div className="thread-profile-vitals">
            <h1>{this.props.user.username}</h1>
            <h2>{this.props.user.age} &#8729; {this.props.user.gender} &#8729; {this.props.user.loc_desc}</h2>
          </div>
        </div>
      );
    } else { display = (<div className="thread-profile-header"></div>); }

    return(
      <div onClick={this.goToUser}>
        {display}
      </div>
    );
  }

});

module.exports = MessageProfileHeader;
