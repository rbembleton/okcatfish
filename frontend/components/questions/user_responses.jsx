const React = require('react');
const QuestionsStore = require('../../stores/questions_store');
const QuestionsActions = require('../../actions/questions_actions');
const SingleResponse = require('./single_response');


const UserResponses = React.createClass({

  getInitialState () {
    return ({ responses: QuestionsStore.userResponses(this.props.userId)});
  },

  componentDidMount () {
    this.questionsListener = QuestionsStore.addListener(this.updateResponses);
    QuestionsActions.getAllResponses(this.props.userId);
  },

  componentWillUnmount () {
    this.questionsListener.remove();
  },

  updateResponses () {
    this.setState({ responses: QuestionsStore.userResponses(this.props.userId)});
  },

  render () {
    const dispResponses = (this.state.responses.map((response, idx) => {
        return <SingleResponse key={idx} response={response}/>;
      })
    );

    return (
      <div className="questions-container">
        {dispResponses}
      </div>
    );
  }


});

module.exports = UserResponses;
