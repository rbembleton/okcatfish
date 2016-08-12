const React = require('react');
const ChatPaneConvo = require('./chat_pane_convo');
const MessagesStore = require('../../stores/messages_store');


const ChatPane = React.createClass({

  getInitialState () {
    return {
      showStatus: 'minimized',
      thread: (MessagesStore.currentThread() || {}),
      open: false
    };
  },

  handleMailClick (e) {
    e.preventDefault();
    if (this.state.thread.id) {
      if (this.state.showStatus === 'minimized') {
        this.setState({ showStatus: 'display' });
      } else {
        this.setState({ showStatus: 'minimized', open: false });
      }
    }
  },

  componentDidMount() {
    this.threadListener = MessagesStore.addListener(this.updateThread);
  },

  componentWillUnmount() {
    this.threadListener.remove();
  },

  updateThread() {
    this.setState({thread: MessagesStore.currentThread() || {}});
  },

  handleOpenClick (e) {
    e.preventDefault();
    const newShowStatus = this.state.open? false : true;
    this.setState({ open: newShowStatus });
  },



  render() {
    const chatClass = "chat-pane";
    const barStyle = this.state.showStatus === 'minimized' ?
      {maxWidth: '0px'} :
      {maxWidth: '200px'};

    const messageConvos = (this.state.thread.id) ?
      <ChatPaneConvo threadId={this.state.thread.id} open={this.state.open}/> :
        (<div></div>);

    const mailSymbolClass = (this.state.thread.id) ?
      ( this.state.showStatus === 'minimized' ?
      "chat-mail-symbol noselect mail-glowing" :
      "chat-mail-symbol noselect"
      ): "chat-mail-symbol noselect";

    return (
      <div className={chatClass}>
        <div className={mailSymbolClass} onClick={this.handleMailClick}>
          &#9993;
        </div>
        <div className="chat-bar" style={barStyle}>
          <div className="single-chat-on-bar" onClick={this.handleOpenClick}>
            <div className="chat-profile-pic-container">
              <img src={this.state.thread.id ? this.state.thread.other_user.prof_pic.url : ""}/>
            </div>
            {this.state.thread.id? this.state.thread.other_user.username : ""}
          </div>
        </div>
        {messageConvos}
      </div>
    );
  }

});

module.exports = ChatPane;
