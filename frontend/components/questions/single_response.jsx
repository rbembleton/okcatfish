const React = require('react');


const SingleResponse = React.createClass({

  render () {
    const currentThis = this;

    const dispAnswers = currentThis.props.response.question.answers.map((answer, idx) => {
      const thisClass = (currentThis.props.response.answer_id === answer.id) ?
        "single-uresp-answer selected-answer" : "single-uresp-answer";

      return (
        <div className={thisClass} key={idx}>
          {answer.order + ": " + answer.body}
        </div>
      );
    });

    const dispExplanation = currentThis.props.response.explanation ?
      <div className="single-uresp-explanation">{this.props.response.explanation}</div> :
      "";

    return(
      <div className="single-user-response">
        <div className="single-uresp-question">{this.props.response.question.body}</div>
        {dispAnswers}
        {dispExplanation}
      </div>
    );
  }

});

module.exports = SingleResponse;
