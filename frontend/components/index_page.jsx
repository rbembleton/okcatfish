const React = require('react');
const SignUpForm = require('./sign_up_form');
const LogInForm = require('./log_in_form');

const IndexPage = React.createClass({

  getInitialState() {
    return({form: "signup"});
  },


  handleClick(e) {
    e.preventDefault();
    const form = this.state.form === "signup" ? "login" : "signup";
    this.setState({form: form});
  },


  render () {

    return (
      <div>
        <div className="sign-up-bkg">
          <div className="sign-up-header">
            <div className="header-login">
              {this.state.form === "signup" ? "Already a member?" : "Not a member yet?" }
              <button className="log-in-button" onClick={this.handleClick}>
                {this.state.form === "signup" ? "Sign in" : "Sign Up" }
              </button>
            </div>
            <div className="header-logo">
              <img src={window.okclogo}></img>
            </div>
          </div>
          <div className="sign-up-bottom">
            <div className="sign-up-catchphrase">
              When being yourself just isn&#39;t enough.
            </div>
            {this.state.form === "signup" ? <SignUpForm/> : <LogInForm /> }
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
