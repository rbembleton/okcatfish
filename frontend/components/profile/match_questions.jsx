const React = require('react');
const UserResponses = require('../questions/user_responses');
const AnswerQuestions = require('../questions/answer_questions');

const MatchQuestions = React.createClass({


  render () {

    return (
      <div className="profile-main">
        <UserResponses userId={this.props.user.id}/>
      </div>
    );

  }

});

module.exports = MatchQuestions;
