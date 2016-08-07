const React = require('react');
const SessionStore = require('../../stores/session_store');
const MessagesActions = require('../../actions/messages_actions');
const Inbox = require('./inbox');


const MessagesMain = React.createClass({

  componentDidMount() {
    const currentUser = SessionStore.currentUser();
    MessagesActions.getAllThreads(currentUser.id);
  },

  render () {
    // {this.props.children}
    return (
      <div className="messages-container center-container">
        {this.props.children}
      </div>
    );

  }

});

module.exports = MessagesMain;
