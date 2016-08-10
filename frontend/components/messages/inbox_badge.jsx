const React = require('react');

const InboxBadge = React.createClass({

  getInitialState() {
    return({isFlashing: false, lastNotifications: this.props.notifcations});
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.notifications !== this.state.lastNotifications) {
      this.flashBadge();
      this.setState({lastNotifications: nextProps.notifications});
    }
  },

  flashBadge () {
    this.setState({isFlashing: true});
    this.flashBadgePt2();
  },

  flashBadgePt2 () {
    let tempThis = this;
    this.badgeInterval = window.setTimeout(function(){
      tempThis.setState({ isFlashing: false });
    }, 320);
  },

  render () {
    let badgeClass = (this.props.notifications > 1 ? "display-inbox-badge" : "hide-inbox-badge");
    badgeClass += (this.state.isFlashing ? " badge-flash" : "");

    return (
      <div className={badgeClass}>
        {this.props.notifications}
      </div>
    );
  }

});

module.exports = InboxBadge;
