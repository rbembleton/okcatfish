const React = require('react');
const SessionStore = require('../../stores/session_store');
const MessagesStore = require('../../stores/messages_store');
const MessagesActions = require('../../actions/messages_actions');


const NewMessageForm = React.createClass({

  getInitialState () {
    return ({body: ""});
  },

  handleSubmit(e) {
    e.preventDefault();
    MessagesActions.sendNewMessage({
      thread_id: this.props.thread.id,
      body: this.state.body,
      author_id: SessionStore.currentUser().id,
      recipient_id: this.props.thread.other_user.id
    });
    this.setState({body: ""});
  },

  bodyChange(e) {
    e.preventDefault();
    this.setState({body: e.target.value});
  },

  render () {

    return (

        <form onSubmit={this.handleSubmit}>
          <textarea
            className="input-text"
            placeholder="...message"
            value={this.state.body}
            name="body"
            onChange={this.bodyChange}
          />
          <input
            className="new-user-button"
            type="submit"
            value="Send"
          />
        </form>

    );
  }

});

module.exports = NewMessageForm;
