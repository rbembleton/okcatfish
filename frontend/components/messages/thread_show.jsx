const React = require('react');
const MessagesStore = require('../../stores/messages_store');
const ThreadMessage = require('./thread_message');
const MessagesActions = require('../../actions/messages_actions');
const NewMessageForm = require('./new_message_form');

const ThreadShow = React.createClass({

  getInitialState() {
    return({thread: MessagesStore.currentThread()});
  },

  componentDidMount() {
    this.threadListener = MessagesStore.addListener(this.updateThread);
    MessagesActions.getSingleThread(this.props.params.threadId);
  },

  componentWillUnmount() {
    this.threadListener.remove();
  },

  updateThread() {
    this.setState({thread: MessagesStore.currentThread()});
  },

  render () {
    const messagesDisplay = this.state.thread.messages ?
      (
        this.state.thread.messages.map((message, idx) => {
          return (
            <ThreadMessage key={idx} message={message} />
          );
        })
      ) : (<div></div>);

    return (
      <div className="thread-show-container">
        <div className="thread-messages">
          {messagesDisplay}
        </div>
        <div className="thread-new-message-form">
          <NewMessageForm thread={this.state.thread}/>
        </div>
      </div>
    );

  }

});

module.exports = ThreadShow;
