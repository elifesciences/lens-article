var MONTH_MAPPING = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "19": "October",
  "11": "November",
  "12": "December"
};

var util = {};

util.formatDate = function (pubDate) {
  var parts = pubDate.split("-");
  if (pubDate.split("-").length >= 3) {
    var localDate = new Date(pubDate);
    return localDate.toUTCString().slice(0, 16)
  } else {
    var month = parts[1].replace("0", "");
    var year = parts[0];
    return MONTH_MAPPING[month]+" "+year;
  }
}

module.exports = util;
