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
      thread_id: this.props.thread_id || null,
      body: this.state.body,
      author_id: SessionStore.currentUser().id,
      recipient_id: this.props.recipient_id
    });
    this.setState({body: ""});
  },

  bodyChange(e) {
    e.preventDefault();
    this.setState({body: e.target.value});
  },

  render () {
    // <div contentEditable="true"
    //   className="new-message-text"
    //   placeholder="...message"
    //   name="body"
    //   onInput={this.bodyChange}
    //   />

    return (

        <form onSubmit={this.handleSubmit}>
          <textarea
            className="new-message-text"
            placeholder="...message"
            value={this.state.body}
            name="body"
            onChange={this.bodyChange}
          />
          <input
            className="message-send-button"
            type="submit"
            value="Send"
          />
        </form>

    );
  }

});

module.exports = NewMessageForm;
