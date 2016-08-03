const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;

const Landing = React.createClass({


  componentDidMount () {
    this.seshListener = SessionStore.addListener(this.checkLogOut);
  },

  componentWillUnmount () {
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

  render () {
    return (
      <div className="main-page">
        <nav className="nav-bar">
          <div className="nav-left">
            <img src={window.okclogo}/>
          </div>
          <div className="nav-right">
            <input className="log-out-button" type="button" onClick={this.logOutClick} value="Log Out"/>
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
