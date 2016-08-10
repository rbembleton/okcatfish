const React = require('react');

const MatchPercentage = React.createClass({

  render () {

    let matchPercentageClass = "search-match-percentage ";
    if (this.props.matchPercentage >= 0.80) { matchPercentageClass += "mp-green"; }
    else if (this.props.matchPercentage >= 0.60) { matchPercentageClass += "mp-blue"; }
    else if (this.props.matchPercentage >= 0.40) { matchPercentageClass += "mp-yellow"; }
    else if (this.props.matchPercentage >= 0.20) { matchPercentageClass += "mp-orange"; }
    else if (this.props.matchPercentage >= 0.00) { matchPercentageClass += "mp-red"; }


    return (
      <div className={matchPercentageClass}>
        {Math.round(this.props.matchPercentage * 100) + "% Match"}
      </div>
    );
  }

});

module.exports = MatchPercentage;
