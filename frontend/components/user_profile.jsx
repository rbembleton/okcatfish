const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const UserProfile = React.createClass({


  render () {
    const currUser = SessionStore.currentUser();

    return (
      <div className="profile-container">
        <h1>{SessionStore.currentUser().username}</h1>
        <h2>{currUser.age} . {currUser.gender} . {currUser.location}</h2>
        <br/>

        {Object.keys(SessionStore.currentUser()).map((el, i)=>{
          if (el === "username") {return "";}
          return <div key={i}>{el + ": " + SessionStore.currentUser()[el]}</div>;
        })}
      </div>
    );
  }

});

module.exports = UserProfile;
