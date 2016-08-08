const React = require('react');

const ThreadNotification = React.createClass({


  render () {

    return (
      <div className="thread-notification">
        <div className="thread-message-body">
          {this.props.message.body}
        </div><br/>
        {this.props.message.time_ago + " ago"}
      </div>
    );

  }

});

module.exports = ThreadNotification;
