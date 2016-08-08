const React = require('react');
const SearchStore = require('../stores/search_store');
const SessionStore = require('../stores/session_store');
const SearchActions = require('../actions/search_actions');
const ProfileSearchBox = require('./profile/profile_search_box');
const LikeActions = require('../actions/like_actions');

const BrowseMatches = React.createClass({

  getInitialState () {
    return({ matches: [], distance: 2 });
  },

  componentDidMount() {
    this.searchListener = SearchStore.addListener(this.updateMatches);
    LikeActions.getMyLikes(SessionStore.currentUser().id);
  },

  componentWillUnmount() {
    this.searchListener.remove();
  },

  updateMatches() {
    this.setState({matches: SearchStore.all()});
  },

  distanceChange(e) {
    e.preventDefault();
    this.setState({distance: e.target.value});
  },

  startSearch(e) {
    e.preventDefault();
    const currentUser = SessionStore.currentUser();
    const userLocation = {lat: currentUser.lat, lng: currentUser.lng};
    SearchActions.getMatches({
      user_id: currentUser.id,
      location: userLocation,
      distance: this.state.distance,
      looking_for: currentUser.gender,
      orientation: currentUser.orientation
    });
  },

  render () {

    const distArray = [2,5,10,20,50];

    const distanceOptions = distArray.map((dist, i) => {
      return (<option value={dist} key={i}>{dist} miles</option>);
    });


    const matchesDisplay = this.state.matches.map((match, idx) => {
      return (
        <ProfileSearchBox
          key={idx}
          user={match}
        />
      );
    });

    return (
      <div className="search-container center-container">
        <div className="search-criteria white-container">
          <form onSubmit={this.startSearch}>
            Distance from you:&nbsp;
            <select
              className="search-drop-down"
              onChange={this.distanceChange}
            >
              {distanceOptions}
              <option value="none">Any!</option>
            </select>
            <input
              className="search-button green-button"
              type="submit"
              value="Search"
            />
          </form>
        </div>
        <div className="matches-container">
          {matchesDisplay}
        </div>
      </div>
    );

  }

});

module.exports = BrowseMatches;
