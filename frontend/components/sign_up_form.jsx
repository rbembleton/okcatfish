const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
const AuthFormConstants = require('../constants/auth_form_constants');
const ErrorStore = require('../stores/error_store');

const SignUpForm = React.createClass({

  getInitialState () {
    return ({username: "", password: "", errors: []});
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.updateErrors);
    this.logInListener = SessionStore.addListener(() => {
      hashHistory.push("/home/user");
    });
  },

  componentWillUnmount () {
    this.errorListener.remove();
    this.logInListener.remove();
  },

  updateErrors () {
    this.setState({errors: ErrorStore.errors(AuthFormConstants.SIGN_UP_FORM)});
  },

  handleSubmit(e) {
    e.preventDefault();
    SessionActions.signUp(this.state);
    this.setState({username: "", password: ""});
  },

  usernameChange(e) {
    e.preventDefault();
    this.setState({username: e.target.value});
  },

  passwordChange(e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  },

  render () {
    return (
      <div className="sign-up-form">
        <form onSubmit={this.handleSubmit}>
          <input
            className="input-text"
            type="text"
            placeholder="username"
            value={this.state.username}
            name="username"
            onChange={this.usernameChange}
          />
          <input
            className="input-text"
            type="password"
            placeholder="password"
            value={this.state.password}
            name="password"
            onChange={this.passwordChange}
          />
          <input
            className="new-user-button"
            type="submit"
            value="Register"
          />
        </form>
        {this.state.errors.length > 0 ? <div className="errors">{this.state.errors.join('. ')+"!"}</div>  : ""}
      </div>
    );
  }

});

module.exports = SignUpForm;
