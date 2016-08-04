const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
const AuthFormConstants = require('../constants/auth_form_constants');
const SignUpForm = require('./sign_up_form');
const ErrorStore = require('../stores/error_store');
const ProfileConstants = require('../constants/profile_constants');

const InitialRegistration = React.createClass({

  getInitialState () {
    return ({
      regStage: 0,
      gender: "male",
      lookingForGenders: "men",
      orientation: "",
      location: null,
      birthdateDay: 1,
      birthdateMonth: 1,
      birthdateYear: 1998,
      errors: []
    });
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

  handleContinue(e) {
    e.preventDefault();
    let orientation;
    if (this.state.lookingForGenders === "both"){ orientation = "bisexual";
    } else if (this.state.lookingForGenders === "men") {
        if (this.state.gender === "male") { orientation = "gay"; }
        else if (this.state.gender === "female") { orientation = "straight"; }
    } else if (this.state.lookingForGenders === "women") {
        if (this.state.gender === "male") { orientation = "straight"; }
        else if (this.state.gender === "female") { orientation = "lesbian"; }
    }

    this.setState({gender: this.state.gender, orientation: orientation, regStage: 1});
  },

  handle2ndContinue(e) {
    e.preventDefault();

    this.setState({ regStage: 2 });
  },

  genderChange(e) {
    e.preventDefault();
    this.setState({gender: e.target.value});
  },

  zipChange(e) {
    e.preventDefault();
    this.setState({location: e.target.value});
  },

  lookingForGendersChange(e) {
    e.preventDefault();
    this.setState({lookingForGenders: e.target.value});
  },

  dayChange(e) {
    e.preventDefault();
    this.setState({ birthdateDay: e.target.value });
  },

  monthChange(e) {
    e.preventDefault();
    this.setState({ birthdateMonth: e.target.value });
  },

  yearChange(e) {
    e.preventDefault();
    this.setState({ birthdateYear: e.target.value });
  },



  render () {

    let formToDisplay;

    const daysDDown = ProfileConstants.DATE_DAYS;
    const monthsDDown = ProfileConstants.DATE_MONTHS;
    const yearsDDown = ProfileConstants.DATE_YEARS;

    if (this.state.regStage === 0) {
      formToDisplay = (
        <form onSubmit={this.handleContinue}>
          I&apos;m a
          <select className="input-text ddown input-gender" name="gender" onChange={this.genderChange}>
            <option value="male">man</option>
            <option value="female">woman</option>
          </select>
          interested in
          <select className="input-text ddown input-gender" name="lookingForGenders" onChange={this.lookingForGendersChange}>
            <option value="men">men</option>
            <option value="women">women</option>
            <option value="both">both</option>
          </select>
          <input
            className="new-user-button"
            type="submit"
            value="Continue"
            />
        </form>
      );
    } else if (this.state.regStage === 1) {
      formToDisplay = (
        <form onSubmit={this.handle2ndContinue}>
          <input
            type="text"
            className="input-text input-zip"
            name="zipcode"
            placeholder="zip code"
            onChange={this.zipChange}/>
          <select className="input-text ddown bday-day" onChange={this.dayChange}>
            {daysDDown.map((el, i)=>{return(<option key={i} value={el}>{el}</option>);})}
          </select>
          <select className="input-text ddown bday-month" onChange={this.monthChange}>
            {monthsDDown.map((el, i)=>{return(<option key={i} value={i + 1}>{el}</option>);})}
          </select>
          <select className="input-text ddown bday-year" onChange={this.yearChange}>
            {yearsDDown.map((el, i)=>{return(<option key={i} value={el}>{el}</option>);})}
          </select>
          <input
            className="new-user-button"
            type="submit"
            value="Continue"
            />
        </form>
      );
    } else if (this.state.regStage === 2) {
      let registration = {
        orientation: this.state.orientation,
        gender: this.state.gender,
        zip: this.state.location,
        birthdate: `${this.state.birthdateYear}-${this.state.birthdateMonth}-${this.state.birthdateDay}`
      };
      formToDisplay = (<SignUpForm regData={registration}/>);
    }

    return (
      <div className="sign-up-form">
        {formToDisplay}
        {this.state.errors.length > 0 ? <div className="errors">{this.state.errors.join('. ')+"!"}</div>  : ""}
      </div>
    );
  }

});

module.exports = InitialRegistration;
