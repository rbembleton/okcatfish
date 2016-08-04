const React = require('react');
const ProfileConstants = require('../../constants/profile_constants');
const ProfileActions = require('../../actions/profile_actions');

const UserProfileText = React.createClass({

  getInitialState() {
    return({editing: false, text: (this.props.text || "")});
  },

  editText (e) {
    e.preventDefault();
    this.setState({editing: true});
  },

  saveText (e) {
    e.preventDefault();
    ProfileActions.editProfileText({
      textType: this.props.textType,
      text: this.state.text,
      id: this.props.id
    });
    this.setState({editing: false});

  },

  editOrSave () {
    if (this.state.editing) {
      return (
        <input
          type="button"
          data-type={this.props.textType}
          value="save"
          onClick={this.saveText}/>
      );
    } else {
      return (
        <input
          type="button"
          data-type={this.props.textType}
          value="edit"
          onClick={this.editText}/>
      );
    }
  },

  handleChange(e) {
    e.preventDefault();
    this.setState({text: e.target.value});
  },

  textareaOrDisplay() {
    if (this.state.editing) {
      return (
        <textarea
          data-type={this.props.textType}
          className="profile-edit-textarea"
          value={this.state.text}
          onChange={this.handleChange}/>
      );
    } else {
      return (
        (this.state.text) ?
        <p>{this.state.text}</p> :
        <p></p>);
    }
  },

  render() {

    return (
      <div>
        <h3>{ProfileConstants.PROFILE_TEXTS[this.props.textType]}
          {this.editOrSave()}
        </h3>
        {this.textareaOrDisplay()}
      </div>
    );
  }

});

module.exports = UserProfileText;
