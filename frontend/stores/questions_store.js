const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const QuestionsConstants = require('../constants/questions_constants');

let _questionsQueue = [];
let _currentQuestion = {};
let _responses = {};

const QuestionsStore = new Store (AppDispatcher);

function queueQuestions (questions) {
  questions.forEach((question) => {
    if (!_questionsQueue.some(queuedQ => question.id === queuedQ)) {
      _questionsQueue.push(question);
    }
  });
}

function updateUserResponses (userId, responses) {
  let responseObj = {};
  responses.forEach((response) => {
    responseObj[response.id] = response;
  });
  _responses[userId] = responseObj;
}

function updateSingleResponse (response) {
  if (_responses[response.user_id]) {
    _responses[response.user_id][response.id] = response;
  } else {
    let newRespObj = {};
    newRespObj[response.id] = response;
    _responses[response.user_id] = newRespObj;
  }
}

function updateNextQuestion () {
  _currentQuestion = _questionsQueue.shift() || {};
}

QuestionsStore.nextQuestion = function () {
  if (!_currentQuestion.id) {
    console.log(_currentQuestion);
    _currentQuestion = _questionsQueue.shift() || {};
  }

  return Object.assign({}, _currentQuestion);
};

QuestionsStore.questionsQueue = function () {
  return _questionsQueue.map((question) => {
    return Object.assign({}, question);
  });
};

QuestionsStore.userResponses = function (userId) {
  if (!_responses[userId]) { return []; }
  return Object.keys(_responses[userId]).map((responseId) => {
    return Object.assign({}, _responses[userId][responseId]);
  });
};


QuestionsStore.__onDispatch = function (payload) {
  console.log(payload.actionType);
  switch (payload.actionType) {
    case QuestionsConstants.RECEIVE_SINGLE_RESPONSE:
      updateSingleResponse(payload.response);
      break;
    case QuestionsConstants.RECEIVE_CREATED_RESPONSE:
      updateSingleResponse(payload.response);
      updateNextQuestion();
      break;
    case QuestionsConstants.RECEIVE_ALL_RESPONSES:
      updateUserResponses(payload.userId, payload.responses);
      break;
    // case QuestionsConstants.RECEIVE_SINGLE_QUESTION:
    //   resetPhotos(payload.question);
    //   break;
    case QuestionsConstants.RECEIVE_NEXT_20_QUESTIONS:
      queueQuestions(payload.questions);
      break;
  }
  QuestionsStore.__emitChange();

};

module.exports = QuestionsStore;
