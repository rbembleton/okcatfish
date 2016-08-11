const React = require('react');
const ProfileHeader = require('./profile_header');
const SearchActions = require('../../actions/search_actions');
const ProfileActions = require('../../actions/profile_actions');
const MatchProfileStore = require('../../stores/match_profile_store');
const NewMessageForm = require('../messages/new_message_form');
const PhotosStore = require('../../stores/photos_store');
const PhotoCarousel = require('../photos/photo_carousel');
const MatchAbout = require('./match_about');
const MatchQuestions = require('./match_questions');
const ProfileFixedHeader = require('./profile_fixed_header');


const MatchProfile = React.createClass({

  getInitialState() {
    return({
      user: {},
      photos: [],
      whichChild: 'about',
      whichHeader: 'standard',
      howFar: 0
    });
  },

  updateUser() {
    this.setState({user: MatchProfileStore.match()});
  },

  updatePhotos() {
    this.setState({photos: PhotosStore.all()});
  },

  componentDidMount() {
    this.profileListener = MatchProfileStore.addListener(this.updateUser);
    this.photoListener = PhotosStore.addListener(this.updatePhotos);
    SearchActions.getMatch(this.props.params.userId);
    ProfileActions.getUserPhotos(this.props.params.userId);
    window.addEventListener('scroll', this.handleScroll);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.profileListener.remove();
    this.photoListener.remove();
  },

  handleScroll(e) {
    // console.log(e.srcElement.body.scrollTop);
    const currScroll = e.srcElement.body.scrollTop;

    if (currScroll >= 300) {
      const howFar = (currScroll - 420) <= 67 ? (currScroll - 420) : 67;
      this.setState({whichHeader: 'fixed', howFar: howFar});
    } else { this.setState({whichHeader: 'standard'}); }
  },

  updateChild(e) {
    this.setState({whichChild: e.target.id});
  },


  render () {

    const currChild = (
      this.state.whichChild === 'about' ?
        <MatchAbout user={this.state.user}/> :
        <MatchQuestions user={this.state.user}/>
    );



    let toRender = (<div></div>);

    if (this.state.user.id) {

      const howFarNow = {
        top: `${this.state.howFar}px`
      };

      const currHeader = (this.state.whichHeader === 'standard') ?
        (
          <div>
            <ProfileHeader user={this.state.user} showLikeBox={true}/>
            <div className="profile-new-message-form white-container">
              <NewMessageForm
                recipient_id={this.state.user.id}
              />
            </div>
          </div>
        ) : (
          <div>
            <ProfileHeader user={this.state.user} showLikeBox={true}/>
            <div className="profile-new-message-form white-container">
              <NewMessageForm
                recipient_id={this.state.user.id}
              />
            </div>
            <ProfileFixedHeader user={this.state.user} style={howFarNow}/>
          </div>
        );

      toRender = (
        <div>
          {currHeader}
          <div className="select-user-page clearfix">
            <ul>
              <li
                id='about'
                className={this.state.whichChild === 'about' ? "selected-user-page" : ""}
                onClick={this.updateChild}>About</li>
              <li><PhotoCarousel photos={this.state.photos}/></li>
              <li
                id='questions'
                className={this.state.whichChild === 'questions' ? "selected-user-page" : ""}
                onClick={this.updateChild}>Questions</li>
            </ul>
          </div>
          {currChild}
        </div>
      );
    }

    return (
      <div className="profile-container center-container">
        {toRender}
      </div>
    );

  }

});

module.exports = MatchProfile;
