const React = require('react');
const LogInForm = require('./log_in_form');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
const InitialRegistration = require('./initial_registration');

const IndexPage = React.createClass({

  getInitialState() {
    return({showModal: false});
  },

  componentDidMount () {
    this.logInListener = SessionStore.addListener(() => {
      hashHistory.push("/home/user");
    });
  },

  componentWillUnmount () {
    this.logInListener.remove();
  },


  handleClick(e) {
    this.openModal(e);
  },

  guestLogIn(e) {
    e.preventDefault();
    SessionActions.guestLogIn();
  },

  closeModal () {
    this.setState({ showModal: false });
  },

  openModal (e) {
    e.preventDefault();
    this.setState({ showModal: true });
  },


  render () {
    // <div style={{
    //     backgroundImage: `url("${window.okcbkg}")`,
    //     backgroundSize: `cover`,
    //     backgroundPositionY: `-585px`,
    //     backgroundRepeat: `no-repeat`,}}>

    return (
      <div>
        <div className="sign-up-image">
          <img src={window.okcbkg}></img>
        </div>
        <div className="sign-up-bkg">
          <div className="sign-up-header">
            <div className="header-login">
              Already a member?
              <button className="log-in-button blue-button" onClick={this.handleClick}>
                Sign in
              </button>
              <LogInForm show={this.state.showModal} closeModal={this.closeModal}/>
              <button className="log-in-button blue-button" onClick={this.guestLogIn}>
                Demo Login
              </button>
            </div>
            <div className="header-logo">
              <img src={window.okclogo}></img>
            </div>
          </div>
          <div className="sign-up-bottom">
            <div className="sign-up-catchphrase">
              When being yourself just isn&#39;t enough.
              <div className="sign-up-definition">
                <strong>catfish</strong>{" | "}<em>noun</em>{" | cat·fish | a person who sets up a false personal profile"}
                <br/>{"on a social networking site for fraudulent or deceptive purposes"}
              </div>
            </div>
            <InitialRegistration/>
          </div>
        </div>
        <div className="sign-up-baity">
          <div className="image-container">
            <div className="entry-image">
              <img src={window.entry1}></img>
              Signing up is quick and easy, you can be living your anonymous dating dreams in minutes!
            </div>
            <div className="entry-image">
              <img src={window.entry2}></img>
              Pretend to be someone else for a day or for the rest of your life.
            </div>
            <div className="entry-image">
              <img src={window.entry3}></img>
              But like, don&#39;t meet up with people because... you know... catfishing...
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = IndexPage;
