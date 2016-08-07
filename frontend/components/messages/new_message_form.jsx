const React = require('react');
const SessionStore = require('../../stores/session_store');
const MessagesStore = require('../../stores/messages_store');
const MessagesActions = require('../../actions/messages_actions');
const ReactQuill = require('react-quill');


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

    const el = document.getElementsByClassName('new-message-text')[0];
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height: 40px';

    this.setState({body: ""});
  },

  bodyChange(e) {
    e.preventDefault();
    e.target.style.cssText = 'height:auto; padding:0';
    e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
    this.setState({body: e.target.value});
  },

  render () {
    // <div contentEditable="true"
    //   className="new-message-text"
    //   placeholder="...message"
    //   name="body"
    //   onInput={this.bodyChange}
    //   />

    // <ReactQuill
    //   className="new-message-text"
    //   styles={false}
    //   placeholder="...message"
    //   value={this.state.body}
    //   name="body"
    //   onChange={this.bodyChange}
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
            className="message-send-button green-button"
            type="submit"
            value="Send"
          />
        </form>

    );
  }

});

module.exports = NewMessageForm;
