const React = require('react');
const SessionStore = require('../../stores/session_store');
const MessagesActions = require('../../actions/messages_actions');
const MessagesStore = require('../../stores/messages_store');
const InboxThread = require('./inbox_thread');

const Inbox = React.createClass({

  getInitialState() {
    return({threads: MessagesStore.allThreads()});
  },

  componentDidMount() {
    this.threadsListener = MessagesStore.addListener(this.updateThreads);
  },

  componentWillUnmount() {
    this.threadsListener.remove();
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
