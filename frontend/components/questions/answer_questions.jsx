const React = require('react');
const QuestionsStore = require('../../stores/questions_store');
const QuestionsActions = require('../../actions/questions_actions');
const SessionStore = require('../../stores/session_store');


const AnswerQuestions = React.createClass({

  getInitialState () {
    return({
      currentQuestion: QuestionsStore.nextQuestion(),
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
    if (this.state.current_question && this.state.current_question.id != nextQuestion.id) {
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
    e.preventDefault();
    this.setState({ answerId: e.target.value })
  },

  updateMatchAnswers(e) {
    e.preventDefault();
    let newMatchResps = this.state.matchResponseIds;
    const idIdx = newMatchResps.indexOf(e.target.value)
    idIdx > -1 ? newMatchResps.splice(idIdx, 1) : newMatchResps.push(e.target.value);
    this.setState({ matchResponseIds: newMatchResps })
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

    if (this.state.currentQuestion.id) {

      dispUserAnswerOptions = this.state.currentQuestion.answers.map((answer, idx) => {
         return (
           <input
             type="radio"
             label={answer.body}
             selected={this.state.answerId === answer.id}
             value={answer.id}
             key={idx}
           />
       );
       });

       dispMatchAnswerOptions = this.state.currentQuestion.answers.map((answer, idx) => {
         return (
           <label><input
             type="checkbox"
             className="match-answer-choice-checkbox"
             label={answer.body}
             checked={this.state.matchResponseIds.includes(answer.id)}
             value={answer.id}
             key={idx}
             onChange={this.updateMatchAnswers}
           />{answer.body}</label>
         );
       });

       answerform = (
         <form onSubmit={this.handleSubmit}>

           <div className="user-q-response">
             <radiogroup
               className="user-answer-choice-radio"
               onChange={this.updateUserAnswer}
             >
               {dispUserAnswerOptions}
             </radiogroup>
           </div>

           <div className="match-q-responses">
             {dispMatchAnswerOptions}
           </div>

           <div className="answer-weight">
             {this.state.weight * 100 + "%"}
             <input
               className="answer-weight-slider"
               type="range"
               min="0" max="100" step="1"
               onChange={this.updateWeight}
             />
           </div>
           <div className="answer-explanation">
             <input
               className="answer-explanation-text"
               type="textarea"
               placeholder="...explanation"
               value={this.state.explanation}
               onChange={this.updateExplanation}
             />
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

      </div>
    );
  }



});

module.exports = AnswerQuestions;
