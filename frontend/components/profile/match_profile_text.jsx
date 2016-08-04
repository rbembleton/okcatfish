const React = require('react');
const ProfileConstants = require('../../constants/profile_constants');
const ProfileActions = require('../../actions/profile_actions');

const MatchProfileText = React.createClass({

  render() {

    return (
      <div>
      { (this.props.text) ? (
          <div>
            <h3>{ProfileConstants.PROFILE_TEXTS[this.props.textType]}</h3>
            <p>{this.props.text}</p>
          </div>
        ) : (
          <p></p>
        )
      }
      </div>
    );
  }

});

module.exports = MatchProfileText;
