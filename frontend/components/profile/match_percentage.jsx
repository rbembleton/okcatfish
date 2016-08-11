const React = require('react');


const colorsArray = [
  [36, 190, 80], //green
  // [38, 98, 182], //blue
  [230, 207, 102], //yellow
  [227, 140, 82], //orange
  [233, 61, 89], //red
];


const MatchPercentage = React.createClass({

  percentageColor(percent) {
    let amtTop, amtBot;

    if (percent > 75) { return colorsArray[0];
    } else if (percent > 65) {
      amtTop = (percent - 65)/9;
      amtBot = (75 - percent)/13;
      return [
        parseInt(colorsArray[0][0]*amtTop + colorsArray[1][0]*amtBot),
        parseInt(colorsArray[0][1]),
        parseInt(colorsArray[0][2]*amtTop + colorsArray[1][2]*amtBot)
      ];
    } else if (percent > 55) { return colorsArray[1]; }
    else if (percent > 40) {
      amtTop = (percent - 40)/15;
      amtBot = (55 - percent)/15;
      return [
        parseInt(colorsArray[2][0]+2),
        parseInt(colorsArray[1][1]*amtTop + colorsArray[2][1]*amtBot),
        parseInt(colorsArray[1][2]-(percent-40)*2)
      ];
    } else if (percent > 30) { return colorsArray[2]; }
    else if (percent > 20) {
      amtTop = (percent - 20)/10;
      amtBot = (30 - percent)/10;
      return [
        parseInt(colorsArray[2][0]),
        parseInt(colorsArray[2][1]*amtTop + colorsArray[3][1]*amtBot),
        parseInt(colorsArray[2][2])
      ];
    } else { return colorsArray[3]; }
  },

  render () {

    let matchPercentageClass = "search-match-percentage ";
    // if (this.props.matchPercentage >= 0.80) { matchPercentageClass += "mp-green"; }
    // else if (this.props.matchPercentage >= 0.60) { matchPercentageClass += "mp-blue"; }
    // else if (this.props.matchPercentage >= 0.40) { matchPercentageClass += "mp-yellow"; }
    // else if (this.props.matchPercentage >= 0.20) { matchPercentageClass += "mp-orange"; }
    // else if (this.props.matchPercentage >= 0.00) { matchPercentageClass += "mp-red"; }
    //

    const percentageColor = {
      color: ("rgb(" +
        `${this.percentageColor(Math.round(this.props.matchPercentage * 100))}` +
        ")")
    };
    // debugger


    return (
      <div className={matchPercentageClass} style={percentageColor}>
        {Math.round(this.props.matchPercentage * 100) + "% Match"}
      </div>
    );
  }

});

module.exports = MatchPercentage;
