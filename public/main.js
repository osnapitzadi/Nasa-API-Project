// global variables
var api_link = "https://api.nasa.gov/planetary/apod?api_key=4NygJGpaTSjTthxNRlNwkoFX9x6gIJcU9JWytka7";
var api_key = "4NygJGpaTSjTthxNRlNwkoFX9x6gIJcU9JWytka7";
const ISFINISHED = 4;
const ISOK = 200;
var nasa;
var aNasa = [];
var aDates = [];
var today = "";

let startDateDP;
let endDateDP;
// jQuery for datepicker.js cdn
var rn = new Date();
$(function() {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left',
    maxDate: rn,
    // restriction for 21 day
    "maxSpan": {
      "days": 21
  },
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    startDateDP = start._d;
    endDateDP = end._d;
    console.log(start);
    getDate();
    addDataToArray();
    setTimeout(printTitles, 1000);
  });
});

function getDate () {
  aDates = [];
  function getDates (startDate, endDate) {
    var dates = [];
    currentDate = startDate;
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
  }

  var dates = getDates(new Date(startDateDP), new Date(endDateDP));
  dates.forEach(function(date) {
    aDates.push(date.toISOString().slice(0,10))
  });
}

// function getDate () {
//   aDates = [];
//   aNasa = [];
//   var date1 = document.getElementById("date1").value;
//   var date2 = document.getElementById("date2").value;
//   console.log("date1 = "+date1);
//   console.log("date2 = "+date2);
//   var a = new Date(date1);
//   var b = new Date(date2);

//   // helper function to find all dates between two dates
//   var getDates = function(startDate, endDate) {
//   var dates = [],
//   currentDate = startDate,
//   addDays = function(days) {
//     var date = new Date(this.valueOf());
//       date.setDate(date.getDate() + days);
//       return date;
//     };
//     while (currentDate <= endDate) {
//       dates.push(currentDate);
//       currentDate = addDays.call(currentDate, 1);
//     }
//     return dates;

//   };
  
//   var dates = getDates(new Date(date1), new Date(date2));                                                                                                           
//   dates.forEach(function(date) {
//     aDates.push(date.toISOString().slice(0,10))
//   });
//   // dates validation
//   if (DifferenceInDays(a, b) > 30 || DifferenceInDays(a, b) <= 0) {
//     alert("Invalid dates")
//   } else {
//     addDataToArray();
//     aDates = [];
//     setTimeout(printTitles, 1000);
//   }

//   console.log(DifferenceInDays(a, b));
// }

// // helper function to find how many days 
// function DifferenceInDays(firstDate, secondDate) {
//   return Math.round((secondDate-firstDate)/(1000*60*60*24) + 1);
// }

// constructor 
function data(date, hd, api_key) {
    this.date = date;
    this.hd = hd;
    this.api_key = api_key;
}



function getJSONAsync(url, date) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === ISFINISHED && request.status === ISOK) {
      // convert the returned data to a JavaScript object
      // use the Chrome debugger to inspect this variable
      nasa = JSON.parse(request.responseText);
      aNasa.push(nasa);
    }
  };
  request.open('GET', url+"&date="+date);
  request.send();
}

// fill aNasa array with objects 
function addDataToArray() {
  aNasa = [];
  for (let index = 0; index < aDates.length; index++) {
    const element = aDates[index];
    getJSONAsync(api_link, element);
  }
}

function printTitles() {
  var dropdown = document.getElementById("dropdown");
  $( ".option" ).remove();
  for (let index = 0; index < aNasa.length; index++) {
    const tempItem = aNasa[index];

    var tempTitle = document.createElement("option");
    tempTitle.innerHTML = tempItem.title;
    tempTitle.setAttribute("value",index);
    tempTitle.setAttribute("class","option");
    dropdown.appendChild(tempTitle);
  }
}


function printData () {
  $( ".card" ).show();
  var optionDiv = document.getElementById("dropdown");
  var output = document.getElementById("output");
  console.log(optionDiv.value)
  var title = document.getElementById("title");
  title.innerHTML = aNasa[optionDiv.value].title;
  var img = document.getElementById("img");
  var video = document.getElementById("video");
  if (aNasa[optionDiv.value].media_type == "image") {
    img.setAttribute("src", aNasa[optionDiv.value].url);
    img.setAttribute("style", "display: block");
    video.setAttribute("style", "display: none");
  } else {
    video.setAttribute("src", aNasa[optionDiv.value].url);
    video.setAttribute("style", "display: block");
    img.setAttribute("style", "display: none");
  }
  var description = document.getElementById("description");
  description.innerHTML = aNasa[optionDiv.value].explanation;
  var copyright = document.getElementById("copyright");
  copyright.innerHTML = "(c) " + aNasa[optionDiv.value].copyright;
}
