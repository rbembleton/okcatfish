const React = require('react');

const LookingFor = React.createClass({

  lookingFor(gender, orientation) {
    if (orientation === "bisexual") { return "men and women"; }

    if (gender === "female") {
      if (orientation === "straight") { return "men"; }
      else { return "women"; }
    }

    if (gender === "male") {
      if (orientation === "straight") { return "women"; }
      else { return "men"; }
    }

  },

  render() {

    return (
      <div className="profile-looking-for">
        <h3>Looking for</h3>
        <ul>
          <li>{this.lookingFor(this.props.user.gender, this.props.user.orientation)}</li>
          <li>ages {this.props.user.lf_bottom_age} to {this.props.user.lf_top_age}</li>
        </ul>
      </div>
    );
  }
});

module.exports = LookingFor;
