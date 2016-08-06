const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const MessagesConstants = require('../constants/messages_constants');

let _threads = [];
let _thread = {};
const MessagesStore = new Store(AppDispatcher);

function resetThreads(threads) {
  _threads = threads;
}

function resetThread(thread) {
  _thread = thread;
}

function addMessage(message) {
  if (_thread.messages)
    {_thread.messages.push(message);}
}

MessagesStore.allThreads = function () {
  return _threads.map((thread) => {
    return Object.assign({}, thread);
  });
};

MessagesStore.currentThread = function () {
  return Object.assign({}, _thread);
};

MessagesStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case(MessagesConstants.RECEIVE_ALL_THREADS):
      resetThreads(payload.threads);
      break;
    case(MessagesConstants.RECEIVE_SINGLE_THREAD):
      resetThread(payload.thread);
      break;
    case(MessagesConstants.RECEIVE_MESSAGE):
      addMessage(payload.message);
      break;
  }
  this.__emitChange();
};



module.exports = MessagesStore;
