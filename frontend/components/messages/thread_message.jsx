const React = require('react');

const ThreadMessage = React.createClass({


  render () {

    return (
      <div className={this.props.isCurrentUser ? "thread-message t-m-left" : "thread-message t-m-right"}>
        {this.props.message.author + " : "} <br/>
        <div className="thread-message-body">
          {this.props.message.body}
        </div><br/>
        {this.props.message.time_ago + " ago"}
      </div>
    );

  }

});

module.exports = ThreadMessage;
