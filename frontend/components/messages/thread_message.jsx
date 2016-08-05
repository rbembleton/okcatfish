const React = require('react');

const ThreadMessage = React.createClass({


  render () {
    return (
      <div className="thread-message">
        {this.props.message.author + " : "}
        {this.props.message.body} <br/>
        {this.props.message.time_ago + " ago"}
      </div>
    );

  }

});

module.exports = ThreadMessage;
