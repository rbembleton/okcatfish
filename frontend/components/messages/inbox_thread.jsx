const React = require('react');
const MessagesStore = require('../../stores/messages_store');
const MessagesActions = require('../../actions/messages_actions');
const hashHistory = require('react-router').hashHistory;

const InboxThread = React.createClass({


  handleClick(e) {
    e.preventDefault();
    MessagesActions.getSingleThread(this.props.thread.id);
    hashHistory.push(`home/messages/${this.props.thread.id}`);
  },

  render () {
    const messageBadgeClass = (
      "inbox-thread-message-badge " +
      (this.props.thread.most_recent_message.is_read ? "is-read" : "is-unread")
    );

    const whoWroteIt = (
      (this.props.thread.most_recent_message.notification) ?
      (<div className="empty-div">
        <em className="special-yellow">OKCatfish </em>last wrote:&nbsp;
      </div>) :
      (<div className="empty-div">
        <em>{this.props.thread.most_recent_message.author + " "}</em>last wrote:&nbsp;
      </div>)
    );

    return (
      <div className="inbox-thread white-container"
          onClick={this.handleClick}>
        <div className={messageBadgeClass}/>
        <div className="inbox-thread-prof-pic">
          <div className="inbox-mini-pic-container">
            <img src={this.props.thread.other_user.prof_pic.url}/>
          </div>
        </div>
        <div className="inbox-thread-preview">
          convo with: <strong>{this.props.thread.other_user.username}</strong><br/>
          {whoWroteIt}
          {this.props.thread.most_recent_message.body}
        </div>
        <div className="inbox-time-sent">
          {this.props.thread.most_recent_message.time_ago + " ago"}
        </div>
      </div>
    );

  }

});

module.exports = InboxThread;
