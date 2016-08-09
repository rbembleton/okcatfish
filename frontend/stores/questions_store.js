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
  if (_responses[response.userId]) {
    if (_responses[response.userId][response.id]) {
      _responses[response.userId][response.id] = response;
    } else {
      _responses[response.userId][response.id] = response;
      // they're the same?... for now
    }
    _responses[response.userId] = response;
  } else {
    let newRespObj = {};
    newRespObj[response[id]] = response;
    _responses[response.userId] = newRespObj;
  }
}

function updateNextQuestion () {
  _currentQuestion = _questionsQueue.shift();
}

QuestionsStore.nextQuestion = function () {
  if (!_currentQuestion) {
    console.log(_currentQuestion); // HEYYYYYY!
    _currentQuestion = _questionsQueue.shift();
  }

  return Object.assign({}, _currentQuestion);
};

QuestionsStore.questionsQueue = function () {
  return _questionsQueue.map((question) => {
    return Object.assign({}, question);
  });
};

QuestionsStore.userResponses = function (userId) {
  return Object.keys(_responses[userId]).map((response) => {
    return Object.assign({}, response);
  });
};


QuestionsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case QuestionsConstants.RECEIVE_SINGLE_RESPONSE:
      updateSingleResponse(payload.response);
      break;
    case QuestionsConstants.RECEIVE_CREATED_RESPONSE:
      updateNextQuestion();
      updateSingleResponse(payload.response);
      break;
    case QuestionsConstants.RECEIVE_ALL_RESPONSES:
      updateUserResponses(payload.userId, payload.responses);
      break;
    // case QuestionsConstants.RECEIVE_SINGLE_QUESTION:
    //   resetPhotos(payload.photos);
    //   break;
    case QuestionsConstants.RECEIVE_NEXT_20_QUESTIONS:
      queueQuestions(payload.photos);
      break;
  }
  QuestionsStore.__emitChange();

};

module.exports = QuestionsStore;
