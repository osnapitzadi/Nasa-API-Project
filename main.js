const ISFINISHED = 4;
const ISOK = 200;
var nasa;
var aNasa = [];
var aDates = [];

function getDate () {
    aDates = [];
    var date1 = document.getElementById("date1").value;
    var date2 = document.getElementById("date2").value;
    console.log("date1 = "+date1);
    console.log("date2 = "+date2);

    var getDates = function(startDate, endDate) {
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {
              var date = new Date(this.valueOf());
              date.setDate(date.getDate() + days);
              return date;
            };
        while (currentDate <= endDate) {
          dates.push(currentDate);
          currentDate = addDays.call(currentDate, 1);
        }
        return dates;
      };
      
      // Usage
      var dates = getDates(new Date(date1), new Date(date2));                                                                                                           
      dates.forEach(function(date) {
        aDates.push(date.toISOString().slice(0,10))
      });

    
}

function data(date, hd, api_key) {
    this.date = date;
    this.hd = hd;
    this.api_key = api_key;
}


var api_link = "https://api.nasa.gov/planetary/apod?api_key=4NygJGpaTSjTthxNRlNwkoFX9x6gIJcU9JWytka7";
var api_key = "4NygJGpaTSjTthxNRlNwkoFX9x6gIJcU9JWytka7";

function getJSONAsync(url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === ISFINISHED && request.status === ISOK) {
            // convert the returned data to a JavaScript object
            // use the Chrome debugger to inspect this variable
            nasa = JSON.parse(request.responseText);
            aNasa.push(nasa);
        }
    };
    request.open('GET', url);
    request.send();
}

function addDataToArray() {
    getJSONAsync(api_link);
}

addDataToArray();

// Returns an array of dates between the two dates
