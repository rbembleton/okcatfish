const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const UserProfile = React.createClass({

  lookingFor(gender, orientation) {
    if (orientation === "bisexual") { return "men and women"; }

    if (gender === "female") {
      if (orientation === "straight") { return "men"; }
      else { return "women"; }
    }

    if (gender === "male") {
      if (orientation === "straight") { return "women"; }
      else { return "men"; }
    }

  },

  render () {
    let currUser = SessionStore.currentUser() || {};

    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-pic-container">
            <img src={currUser.prof_pic.url}/>
          </div>
          <div className="profile-vitals">
            <h1>{SessionStore.currentUser().username}</h1>
            <h2>{currUser.age} &#8729; {currUser.gender} &#8729; {currUser.location}</h2>
          </div>
        </div>
        <div className="profile-main">
          <div className="profile-text">
            <h3>About Me</h3>
            <p>{currUser.profile_text.about || ""}</p>
            <h3>What I&apos;m Doinnnn</h3>
            <p>{currUser.profile_text.doing || ""}</p>
          </div>
          <div className="profile-looking-for">
            <h3>Looking for</h3>
            <ul>
              <li>{this.lookingFor(currUser.gender, currUser.orientation)}</li>
              <li>ages {currUser.lf_bottom_age} to {currUser.lf_top_age}</li>
            </ul>
        </div>
        </div>
      </div>
    );
    // {Object.keys(SessionStore.currentUser()).map((el, i)=>{
    //   if (el === "username") {return "";}
    //   return <div key={i}>{el + ": " + SessionStore.currentUser()[el]}</div>;
    //   })}
  }

});

module.exports = UserProfile;
