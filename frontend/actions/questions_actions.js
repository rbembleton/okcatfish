const AppDispatcher = require('../dispatcher/dispatcher');
const QuestionsApiUtil = require('../util/questions_api_util');
const QuestionsConstants = require('../constants/questions_constants');

const QuestionsActions = {
  newResponse(data) {
    QuestionsApiUtil.createResponse(data, this.receiveCreatedResponse);
  },

  updateResponse(responseId, data) {
    QuestionsApiUtil.updateResponse(responseId, data, this.receiveSingleResponse);
  },

  showSingleResponse(responseId, data) {
    QuestionsApiUtil.fetchSingleResponse(responseId, this.receiveSingleResponse);
  },

  getAllResponses(userId) {
    QuestionsApiUtil.fetchAllResponses(userId, this.receiveAllResponses);
  },

  getSingleQuestion(id) {
    QuestionsApiUtil.fetchSingleQuestion(id, this.receiveSingleQuestion);
  },

  getNext20Questions(userId) {
    QuestionsApiUtil.fetchNext20Questions(userId, this.receiveNext20Questions);
  },

  receiveSingleResponse(resp) {
    AppDispatcher.dispatch({
      actionType: QuestionsConstants.RECEIVE_SINGLE_RESPONSE,
      response: resp
    });
  },

  receiveCreatedResponse(resp) {
    AppDispatcher.dispatch({
      actionType: QuestionsConstants.RECEIVE_CREATED_RESPONSE,
      response: resp
    });
  },

  receiveAllResponses(resp) {
    AppDispatcher.dispatch({
      actionType: QuestionsConstants.RECEIVE_ALL_RESPONSES,
      responses: resp.user_responses,
      userId: resp.user_id
    });
  },

  receiveSingleQuestion(resp) {
    AppDispatcher.dispatch({
      actionType: QuestionsConstants.RECEIVE_SINGLE_QUESTION,
      question: resp
    });
  },

  receiveNext20Questions(resp) {
    AppDispatcher.dispatch({
      actionType: QuestionsConstants.RECEIVE_NEXT_20_QUESTIONS,
      questions: resp
    });
  },




};

module.exports = QuestionsActions;
