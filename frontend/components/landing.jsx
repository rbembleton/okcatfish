const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
const MessagesStore = require('../stores/messages_store');
const MessagesActions = require('../actions/messages_actions');

const Landing = React.createClass({

  getInitialState () {
    return({ notifications: MessagesStore.numberOfNotifications(SessionStore.currentUser().id) });
  },

  componentDidMount () {
    $(document.body).addClass("blue-bkg");
    this.seshListener = SessionStore.addListener(this.checkLogOut);
    this.messageListener = MessagesStore.addListener(this.updateBadge);
    MessagesActions.getAllThreads(SessionStore.currentUser().id);
  },

  componentWillUnmount () {
    $(document.body).removeClass("blue-bkg");
    this.seshListener.remove();
    this.messageListener.remove();
  },

  checkLogOut () {
    if (!SessionStore.isUserLoggedIn()) {
      hashHistory.push('/');
    }
  },

  updateBadge () {
    this.setState({ notifications: MessagesStore.numberOfNotifications(SessionStore.currentUser().id) });
  },

  logOutClick (e) {
    e.preventDefault();
    SessionActions.logOut();
  },

  browseClick (e) {
    e.preventDefault();
    hashHistory.push('home/browse');
  },

  inboxClick (e) {
    e.preventDefault();
    hashHistory.push('home/messages/inbox');
  },

  profileClick (e) {
    e.preventDefault();
    hashHistory.push('home/user');
  },

  render () {
    return (
      <div className="main-page blue-bkg">
        <nav className="nav-bar blue-bkg clearfix">
          <div className="nav-left clearfix">
            <img src={window.okclogo} />
            <input className="browse-button blue-button" type="button" onClick={this.browseClick} value="Browse"/>
          </div>
          <div className="nav-right clearfix">
            <div className="mini-pic-container round-pic-cont">
              <img
                src={SessionStore.currentUser().prof_pic.url}
                onClick={this.profileClick}
                className="round-pic-img"
                />
            </div>
            <button
              className="log-out-button blue-button"
              onClick={this.inboxClick}>
              Inbox
              <div className={this.state.notifications > 1 ? "display-inbox-badge" : "hide-inbox-badge"}>
                {this.state.notifications}
              </div>
            </button>
            <input className="log-out-button blue-button" type="button" onClick={this.logOutClick} value="Log Out"/>
          </div>
        </nav>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }

});

module.exports = Landing;
