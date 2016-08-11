const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const MessagesConstants = require('../constants/messages_constants');

let _threadsOrder = [];
let _threads = {};
let _thread = {};
const MessagesStore = new Store(AppDispatcher);

function resetThreads(threads) {
  _threadsOrder = [];
  threads.forEach((thread) => {
    _threadsOrder.push(thread.id);
    _threads[thread.id] = thread;
  });
  // _threads = threads;
}

function resetThread(thread) {
  _thread = thread;
}

function addMessage(message) {
  if (_thread.id !== message.thread_id)
    { _thread = _threads[message.thread_id];}

  if (_thread.messages)
    {_thread.messages.push(message);}
}

MessagesStore.numberOfNotifications = function (userId) {
  let num = 0;
  _threadsOrder.forEach((threadId) => {
    num += _threads[threadId].unread_messages[userId];
  });

  return num;
};

MessagesStore.allThreads = function () {
  return _threadsOrder.map((threadId) => {
    return Object.assign({}, _threads[threadId]);
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
