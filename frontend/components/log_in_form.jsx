const React = require('react');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const SessionActions = require('../actions/session_actions');
const AuthFormConstants = require('../constants/auth_form_constants');
const hashHistory = require('react-router').hashHistory;
const Modal = require('react-modal');

const LogInForm = React.createClass({

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
    this.setState({errors: ErrorStore.errors(AuthFormConstants.LOG_IN_FORM)});
  },

  handleSubmit(e) {
    e.preventDefault();
    SessionActions.logIn({username: this.state.username, password: this.state.password});
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

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      swipe: true,
      variablewidth: true,
      accessibility: true
    };

    const style = {
      overlay : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 10
      },
      content : {
        position: 'relative',
        margin: 'auto',
        marginTop: '200px',
        width: '300px',
        height: '340px',
        overflow: 'hidden',
        borderRadius: '10px',
        border: '0px',
        zIndex: 11,
        padding: '0px',
        boxShadow: '2px 2px 3px black',
        backgroundColor: 'transparent'
      }
    };

    return (
      <Modal
        isOpen={this.props.show}
        onRequestClose={this.props.closeModal}
        style={style}>
        <div className="log-in-form">
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
              value="Log In"
            />
          </form>
          {this.state.errors.length > 0 ? <div className="errors">{this.state.errors.join('! ')+"!"}</div>  : ""}
        </div>
      </Modal>
    );
  }

});

module.exports = LogInForm;
