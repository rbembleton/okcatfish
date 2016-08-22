const React = require('react');
const QuestionsStore = require('../../stores/questions_store');
const QuestionsActions = require('../../actions/questions_actions');
const SessionStore = require('../../stores/session_store');


const AnswerQuestions = React.createClass({

  getInitialState () {
    return({
      currentQuestion: QuestionsStore.nextQuestion() || null,
      answerId: null,
      matchResponseIds: [],
      weight: 0.5,
      explanation: ""});
  },

  componentDidMount() {
    QuestionsActions.getNext20Questions(SessionStore.currentUser().id);
    this.questionsListener = QuestionsStore.addListener(this.updateQuestion);
  },

  componentWillUnmount() {
    this.questionsListener.remove();
  },

  updateQuestion() {
    const nextQuestion = QuestionsStore.nextQuestion();

    if (!this.state.currentQuestion.id) {
      this.setState({ currentQuestion: nextQuestion });
    } else if (this.state.currentQuestion.id != nextQuestion.id) {
      this.setState({
        currentQuestion: nextQuestion,
        answerId: null,
        matchResponseIds: [],
        weight: 0.5,
        explanation: ""});
    }
  },

  updateWeight(e){
    e.preventDefault();
    this.setState({ weight: (e.target.value / 100) });
  },

  updateExplanation(e){
    e.preventDefault();
    this.setState({ explanation: e.target.value });
  },

  updateUserAnswer(e) {
    // no prevent default!!! will ruin radio checking!
    this.setState({ answerId: parseInt(e.target.value) });
  },

  updateMatchAnswers(e) {
    // no prevent default!!! will ruin checkbox checking!
    let newMatchResps = this.state.matchResponseIds;
    const checkedVal = parseInt(e.target.value);
    const idIdx = newMatchResps.indexOf(checkedVal);

    const temp = (idIdx > -1) ? newMatchResps.splice(idIdx, 1) : newMatchResps.push(checkedVal);
    this.setState({ matchResponseIds: newMatchResps });
  },


  handleSubmit (e) {
    e.preventDefault();
    QuestionsActions.newResponse({
      answer_id: this.state.answerId,
      user_id: SessionStore.currentUser().id,
      weight: this.state.weight,
      explanation: this.state.explanation,
      match_responses: this.state.matchResponseIds
    });
  },


  render () {

    let answerForm = "";
    let dispUserAnswerOptions = "";
    let dispMatchAnswerOptions = "";
    let currentThis = this;
    let question = "";

    if (this.state.currentQuestion.id) {

      dispUserAnswerOptions = this.state.currentQuestion.answers.map((answer, idx) => {
         return (
           <label key={idx}>
             <input
               type="radio"
               checked={currentThis.state.answerId === answer.id}
               value={answer.id}
               key={idx}
               onChange={currentThis.updateUserAnswer}
             />
           {answer.body}
          </label>
       );
       });

       dispMatchAnswerOptions = currentThis.state.currentQuestion.answers.map((answer, idx) => {
         return (
           <label key={idx}><input
             type="checkbox"
             className="match-answer-choice-checkbox"
             label={answer.body}
             checked={currentThis.state.matchResponseIds.includes(parseInt(answer.id))}
             value={answer.id}
             onChange={currentThis.updateMatchAnswers}
           />{answer.body}</label>
         );
       });

       question = (
         <div className="answer-q-question">
           {currentThis.state.currentQuestion.body}
         </div>
       );


       answerForm = (
         <form onSubmit={currentThis.handleSubmit}>

           <div className="user-match-q-cont clearfix">
             <div className="user-q-response">
                <div className="text-above-responses">Your choice:</div>
                {dispUserAnswerOptions}
             </div>

             <div className="match-q-responses">
               <div className="text-above-responses">Options for your potential match:</div>
               {dispMatchAnswerOptions}
             </div>
           </div>

           <div className="answer-weight">
             How imporant is this question to you?
             <div className="answer-weight-percentage">
               {" " + (parseInt(currentThis.state.weight * 100)) + "% "}
            </div>
             <input
               className="answer-weight-slider"
               type="range"
               min="0" max="100" step="1"
               value={parseInt(currentThis.state.weight * 100)}
               onChange={currentThis.updateWeight}
             />
           </div>
           <div className="answer-explanation">
             Explanation: (optional)<br/>
             <textarea
               placeholder="...explanation"
               className="answer-explanation-text white-container"
               value={currentThis.state.explanation}
               onChange={currentThis.updateExplanation}/>
           </div>
           <input
             className="answer-question-button green-button"
             type="submit"
             value="Submit Response"
           />
        </form>
     );

   }






    return(
      <div className="answer-question-form">
        {question}
        {answerForm}
      </div>
    );
  }



});

module.exports = AnswerQuestions;
