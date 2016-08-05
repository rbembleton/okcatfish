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
    return (
      <div className="inbox-thread" onClick={this.handleClick}>
        <div className="inbox-thread-prof-pic">
          <div className="inbox-mini-pic-container">
            <img src={this.props.thread.other_user.prof_pic.url}/>
          </div>
        </div>
        <div className="inbox-thread-preview">
          convo with: <strong>{this.props.thread.other_user.username}</strong><br/>
          <em>{this.props.thread.most_recent_message.author + " "}</em>
          last wrote:&nbsp; {this.props.thread.most_recent_message.body}
        </div>
        <div className="inbox-time-sent">
          {this.props.thread.most_recent_message.time_ago + " ago"}
        </div>
      </div>
    );

  }

});

module.exports = InboxThread;
