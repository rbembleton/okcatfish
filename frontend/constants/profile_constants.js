let days=[];
let years=[];

for (var i = 1; i <= 31; i++) {
  days.push(i);
}

for (var j = 1998; j >= 1900; j--) {
  years.push(j);
}

module.exports = {
  DATE_MONTHS: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  DATE_DAYS: days,
  DATE_YEARS: years,
  PROFILE_TEXTS: {
    "about": "About Me",
    "doing": "What I Do",
    "faves": "My Favorite Movies, Music, and TV",
    "things": "Material Possessions That I'm Totes Addicted To",
    "think": "I Think...",
    "sat_night": "On Saturday Night I'm Probably",
    "msg_me_if": "Message Me If"
  },
  UPDATE_PROFILE_TEXT: "UPDATE_PROFILE_TEXT"



};
