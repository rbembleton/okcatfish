const React = require('react');
const Slider = require('react-slick');
const Modal = require('react-modal');

const PhotoCarousel = React.createClass({

  getInitialState () {
    return({show: this.props.show});
  },

  closeModal () {
    this.setState({ show: false });
  },
  openModal (e) {
    e.preventDefault();
    this.setState({ show: true });
  },


  render: function () {
    const slickSettings = {
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

    const modalStyle = {
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
        position: 'fixed',
        top: '100px',
        left: '150px',
        right: '150px',
        bottom: '100px',
        border: 'none',
        padding: '20px',
        zIndex: 11,
        background: 'transparent'
      }
    };

    const photoDisplay = this.props.photos.map((photo, idx) => {
      return (
        <div key={idx} className="modal-match-photos">
          <img src={photo.url}/>
        </div>);
    });



    return (
      <div>
        <button
          className="view-photo-button"
          onClick={this.openModal}>
            View Photos
        </button>
        <Modal
          isOpen={this.state.show}
          onRequestClose={this.closeModal}
          style={modalStyle}>
          <Slider {...slickSettings}>
            {photoDisplay}
          </Slider>
        </Modal>
      </div>
    );
  }
});

module.exports = PhotoCarousel;
