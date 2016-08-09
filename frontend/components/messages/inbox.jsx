const React = require('react');
const SessionStore = require('../../stores/session_store');
const MessagesActions = require('../../actions/messages_actions');
const MessagesStore = require('../../stores/messages_store');
const InboxThread = require('./inbox_thread');
// const Pusher = require('pusher-js');

const Inbox = React.createClass({

  getInitialState() {
    return({threads: MessagesStore.allThreads()});
  },

  componentDidMount() {
    this.threadsListener = MessagesStore.addListener(this.updateThreads);
    // const currentUser = SessionStore.currentUser();
    // MessagesActions.getAllThreads(currentUser.id);

    // this.pusher = new Pusher('3d8dffa997851fa3e91f', {
    //   encrypted: true
    // });
    //
    // let channel = this.pusher.subscribe(`threads_channel_${currentUser.id}`);
    // channel.bind('update_threads', this.getAllThreads);
  },

  componentWillUnmount() {
    this.threadsListener.remove();
    // this.pusher.unsubscribe();
  },

  getAllThreads() {
    MessagesActions.getAllThreads(currentUser.id);
  },

  updateThreads () {
    this.setState({threads: MessagesStore.allThreads()});
  },

  render () {
    const toDisplay = this.state.threads.map((thread, idx) => {
      return (<InboxThread key={idx} thread={thread}/>);
    });


    return (
      <div className="inbox-container">
        <div className="inbox-label">Inbox</div>
        {toDisplay}
      </div>
    );

  }

});

module.exports = Inbox;
