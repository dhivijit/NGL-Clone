//esversion:6
// This file will contain bulky functions to make the main file app.js look clean


function monthReturn(monthNumber) {
  //to return the month of the given number of month
  switch (monthNumber) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Error";
  }
}

function dayReturn(daynumber) {
  //returns the day for the given number of the day
  switch (daynumber) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";

    default:
      return "Error";
  }
}

function getDate() {
  //getting the date
  var datetime = new Date();
  var getDate =
    datetime.getUTCDate() +
    " " +
    monthReturn(datetime.getUTCMonth()) +
    " " +
    datetime.getUTCFullYear() +
    ", " +
    dayReturn(datetime.getUTCDay());

  return getDate; //return date
}

function getTime() {
  //getting the time
  var datetime = new Date();
  var minutes = datetime.getUTCMinutes();
  var seconds = datetime.getUTCSeconds();
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds <= 9) {
    seconds = "0" + seconds;
  }

  var getTime = datetime.getUTCHours() + ":" + minutes + ":" + seconds;

  return getTime; //return time
}

function randomText(len) {
  //to generate random text which will be used as a code for identification
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//export functions as a module
module.exports = {
  monthReturn,
  dayReturn,
  getDate,
  getTime,
  randomText,
};
