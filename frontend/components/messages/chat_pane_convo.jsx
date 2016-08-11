const React = require('react');
const MessagesStore = require('../../stores/messages_store');
const ThreadMessage = require('./thread_message');
const MessagesActions = require('../../actions/messages_actions');
const NewMessageForm = require('./new_message_form');
const SessionStore = require('../../stores/session_store');
const MessageProfileHeader = require('./message_profile_header');
const ThreadNotification = require('./thread_notification');
const Pusher = require('pusher-js');

const ChatPane = React.createClass({

  getInitialState () {
    return({ thread: MessagesStore.currentThread() || {} });
  },

  componentDidMount() {
    const currentUser = SessionStore.currentUser();
    this.threadListener = MessagesStore.addListener(this.updateThread);
    MessagesActions.makeThreadRead(this.props.threadId);

    this.pusher = new Pusher('3d8dffa997851fa3e91f', {
      encrypted: true
    });

    let channel = this.pusher.subscribe(`threads_channel_${currentUser.id}`);
    const threadId = parseInt(this.props.threadId);

    channel.bind('update_threads', (resp) => {
      if (resp.thread_id === threadId)
        { this.threadGet(); }
    });

  },

  threadGet() {
    MessagesActions.getSingleThread(this.props.threadId);
  },

  componentWillUnmount() {
    this.threadListener.remove();
    clearInterval(this.messageGetTimer);
    this.pusher.unsubscribe();
  },

  updateThread() {
    this.setState({thread: MessagesStore.currentThread() || {}});
  },



  render() {
    const chatClass = "chat-pane";
    const displaySetting = this.props.open ?
      {display: 'block'} :
      {display: 'none'};

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
      <div className={chatClass}>

        <div className="chat-bar-container" style={displaySetting}>

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
      </div>
    );
  }

});


module.exports = ChatPane;
