const React = require('react');
const SessionStore = require('../../stores/session_store');
const UserResponses = require('../questions/user_responses');
const AnswerQuestions = require('../questions/answer_questions');
const UserQuestions = React.createClass({


  render () {
    let currentUser = SessionStore.currentUser() || {};

    return (
      <div className="profile-main">
        <AnswerQuestions />
        <UserResponses userId={currentUser.id}/>
      </div>
    );

  }

});

module.exports = UserQuestions;
