const AppDispatcher = require('../dispatcher/dispatcher');
const MessagesApiUtil = require('../util/messages_api_util');
const MessagesConstants = require('../constants/messages_constants');

const MessagesActions = {
  getAllThreads(userId) {
    MessagesApiUtil.fetchAllThreads(userId, this.receiveAllThreads);
  },

  getSingleThread(threadId) {
    MessagesApiUtil.fetchSingleThread(threadId, this.receiveSingleThread);
  },

  sendNewMessage(data) {
    MessagesApiUtil.sendNewMessage(data, this.receiveMessage);
  },

  makeThreadRead(threadId) {
    MessagesApiUtil.updateThreadAsRead(threadId, this.receiveSingleThread);
  },

  receiveAllThreads(resp) {
    AppDispatcher.dispatch({
      actionType: MessagesConstants.RECEIVE_ALL_THREADS,
      threads: resp
    });
  },

  receiveSingleThread(resp) {
    AppDispatcher.dispatch({
      actionType: MessagesConstants.RECEIVE_SINGLE_THREAD,
      thread: resp
    });
  },

  receiveMessage(resp) {
    AppDispatcher.dispatch({
      actionType: MessagesConstants.RECEIVE_MESSAGE,
      message: resp
    });
  }


};

module.exports = MessagesActions;
