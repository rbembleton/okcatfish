const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;

const Landing = React.createClass({


  componentDidMount () {
    $(document.body).addClass("blue-bkg");
    this.seshListener = SessionStore.addListener(this.checkLogOut);
  },

  componentWillUnmount () {
    $(document.body).removeClass("blue-bkg");
    this.seshListener.remove();
  },

  checkLogOut () {
    if (!SessionStore.isUserLoggedIn()) {
      hashHistory.push('/');
    }
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
            <input className="log-out-button blue-button" type="button" onClick={this.inboxClick} value="Inbox"/>
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
