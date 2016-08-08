const React = require('react');
const MessagesStore = require('../../stores/messages_store');
const ThreadMessage = require('./thread_message');
const MessagesActions = require('../../actions/messages_actions');
const NewMessageForm = require('./new_message_form');
const SessionStore = require('../../stores/session_store');
const MessageProfileHeader = require('./message_profile_header');
const ThreadNotification = require('./thread_notification');


const ThreadShow = React.createClass({

  getInitialState() {
    return({thread: MessagesStore.currentThread() || {}});
  },

  componentDidMount() {
    this.threadListener = MessagesStore.addListener(this.updateThread);
    // MessagesActions.getSingleThread(this.props.params.threadId);
    MessagesActions.makeThreadRead(this.props.params.threadId);
    this.messageGetTimer = setInterval(this.messageGet, 10000);
  },

  messageGet() {
    MessagesActions.getSingleThread(this.props.params.threadId);
  },

  componentWillUnmount() {
    this.threadListener.remove();
    clearInterval(this.messageGetTimer);
  },

  updateThread() {
    this.setState({thread: MessagesStore.currentThread() || {}});
  },

  render () {
    const currentUser = SessionStore.currentUser();
    const messagesDisplay = this.state.thread.messages ?
      (
        this.state.thread.messages.map((message, idx) => {
          return (
            (message.notification) ?
            <ThreadNotification
              key={idx}
              message={message}
            /> :
            <ThreadMessage
              key={idx}
              message={message}
              isCurrentUser={message.author_id !== currentUser.id}
            />
          );
        })
      ) : (<div></div>);

    return (
      <div className="thread-show-container">
        <div className="thread-other-user-profile">
          <MessageProfileHeader user={this.state.thread.other_user}/>
        </div>
        <div className="thread-messages">
          {messagesDisplay}
        </div>
        <div className="thread-new-message-form white-container">
          <NewMessageForm
            recipient_id={ this.state.thread.id ?
              this.state.thread.other_user.id :
              null }
            thread_id={ this.state.thread.id ?
              this.state.thread.id :
              null }
          />
        </div>
      </div>
    );

  }

});

module.exports = ThreadShow;
