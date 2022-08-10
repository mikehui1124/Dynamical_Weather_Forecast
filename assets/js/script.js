// declare searchForm element
var searchFormEl = document.querySelector('#search-form');

// declare initial searchCount
// fetch existing searchCount from localStorage if existing
var searchCount = 0;
var pastCount= localStorage.getItem('pastCount');

// when pastCount >= 1 time, fetch City names from Storage and display on the page
if (+pastCount) {
  for (i=1; i<+pastCount+1; i++) {
    var pastCity = localStorage.getItem(i);
    console.log('pastCity',i, pastCity);
   displaySearchRecord(pastCity);
  }
}

// When city name is submitted, make fetch request no.1 to get lat/lon coords
// print the city name on the screen as a search record
function handleSearchFormSubmit(event) {
  event.preventDefault(); 
  var searchInputVal = document.querySelector('#search-input').value; 

  if (!searchInputVal) {
    alert('Please input a search City and press Search')
    console.error('You need a search input value!');
    return;
  }

  getLatlonApi(searchInputVal);
  displaySearchRecord(searchInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


// pass searchCity and get its lat, lon coordinates from API
// pass the responded lat/lon coordinates to API and make a second fetch request
function getLatlonApi(searchCity) {

  var coordQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+searchCity+'&appid=29b9e48a4dfd40783b2ca103baf59bbc';

  fetch(coordQueryUrl)
  .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    return response.json();
  })
  .then(function (coordData){
    console.log(coordData);

    if (!coordData.coord.lon) {
      console.log('No results found!');   
     
    } else {        
        var lon = coordData.coord.lon;
        var lat = coordData.coord.lat;   
           
        getWeatherApi(lat,lon,searchCity);      
    }
  })
}

// display city name as search record, store a submitted city name to localStorage pending for retrieve
function displaySearchRecord(searchCity) {

  var recordBtn = document.createElement('button');
  recordBtn.textContent= searchCity;
  recordBtn.classList.add('btn', 'btn-block');
  recordBtn.setAttribute('data-city',searchCity);
  $('#recordButton').append(recordBtn);

  searchCount++;
  localStorage.setItem(searchCount, searchCity);
  localStorage.setItem('pastCount', searchCount);
}

// event listener when record Button is click, 
// get a city attribute and proceed a new fetch request
$("#recordButton").on("click", function(event) {

  var element = event.target;
  if (element.matches("button")) {
    var city = element.getAttribute("data-city");
    console.log(city);
    getLatlonApi(city);
  }
});

// pass lat/lon for a submitted city and request for a 7-day weather results from the API in JSON form
function getWeatherApi(latY,lonX,city) {

  var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latY+'&lon='+lonX+'&exclude=hourly,minutely&units=metric&appid=29b9e48a4dfd40783b2ca103baf59bbc';

  fetch(weatherQueryUrl)
  .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    return response.json();
  })
  .then(function (weathData){
    console.log(weathData);

    if (!weathData.daily[0].temp.day) {
      console.log('No results found!');    
      
    } else {       
    // locate array[0] for today's weather, breakdown into Temp, WindSpeed, Humidity, UV and iconUrl values 
        var nowDate = moment().format('M/D/YYYY');
        
        var nowTemp = weathData.daily[0].temp.day;
        var nowWind = weathData.daily[0].wind_speed;
        var nowHumidity = weathData.daily[0].humidity;
        var nowUvindex = weathData.daily[0].uvi;
        var nowIcon = weathData.daily[0].weather[0].icon;
        var nowIconUrl= 'http://openweathermap.org/img/wn/'+nowIcon+'.png';
       
    // locate array[1] to array[5] for day 1 to day 5 weathers, breakdown into Temp, WindSpeed, Humidity and iconUrl values    
        var fiveDayTemp= [weathData.daily[1].temp.day,weathData.daily[2].temp.day,
        weathData.daily[3].temp.day,weathData.daily[4].temp.day,weathData.daily[5].temp.day];

        var fiveDayWind= [weathData.daily[1].wind_speed,weathData.daily[2].wind_speed,
        weathData.daily[3].wind_speed,weathData.daily[4].wind_speed,weathData.daily[5].wind_speed];

        var fiveDayHumid= [weathData.daily[1].humidity,weathData.daily[2].humidity,
        weathData.daily[3].humidity,weathData.daily[4].humidity,weathData.daily[5].humidity];

        var day1IconUrl = 'http://openweathermap.org/img/wn/'+weathData.daily[1].weather[0].icon+'.png';
        var day2IconUrl = 'http://openweathermap.org/img/wn/'+weathData.daily[2].weather[0].icon+'.png';
        var day3IconUrl = 'http://openweathermap.org/img/wn/'+weathData.daily[3].weather[0].icon+'.png';
        var day4IconUrl = 'http://openweathermap.org/img/wn/'+weathData.daily[4].weather[0].icon+'.png';
        var day5IconUrl = 'http://openweathermap.org/img/wn/'+weathData.daily[5].weather[0].icon+'.png';
        console.log(day1IconUrl, day2IconUrl);

        var fiveDayIcon= [day1IconUrl, day2IconUrl, day3IconUrl, day4IconUrl, day5IconUrl ];



        var day1Date = moment().add(1, 'days').format('M/D/YYYY');
        var day2Date = moment().add(2, 'days').format('M/D/YYYY');
        var day3Date = moment().add(3, 'days').format('M/D/YYYY');
        var day4Date = moment().add(4, 'days').format('M/D/YYYY');
        var day5Date = moment().add(5, 'days').format('M/D/YYYY');
        var fiveDate = [day1Date, day2Date, day3Date, day4Date, day5Date];

    // pass the breakdown values for today into a function printing today's weather        
       printCurrentWeather(nowTemp,nowWind,nowHumidity,nowUvindex,nowIconUrl,city, nowDate);

    // pass the breakdown values for day 1 to day 5 into function print the 5-day weather forecast
       printDay1Weather(fiveDayTemp[0], fiveDayWind[0], fiveDayHumid[0], fiveDayIcon[0], fiveDate[0]);
       printDay2Weather(fiveDayTemp[1], fiveDayWind[1], fiveDayHumid[1], fiveDayIcon[1], fiveDate[1]);
       printDay3Weather(fiveDayTemp[2], fiveDayWind[2], fiveDayHumid[2], fiveDayIcon[2], fiveDate[2]);
       printDay4Weather(fiveDayTemp[3], fiveDayWind[3], fiveDayHumid[3], fiveDayIcon[3], fiveDate[3]);
       printDay5Weather(fiveDayTemp[4], fiveDayWind[4], fiveDayHumid[4], fiveDayIcon[4], fiveDate[4]);
      
    }
  }) 
}

function printCurrentWeather(temp,wind,humidity,uvIndex,icon,city,date) {

  $('#currentTitle').text(city + "  " +  "  " + date);
  $('#currentTemp').text(temp);
  $('#currentWind').text(wind);
  $('#currentHumid').text(humidity);
  $('#uvColorcode').text(uvIndex);
  $('#currentIcon').attr('src',icon);

 // if conditions determining the color code of a UV index
  if (+uvIndex <=4) {
    $('#uvColorcode').css('background-color','#1bbc3e');
    $('#uvColorcode').css('color','white');

  } else if (+uvIndex > 4 && +uvIndex <=10) {
    $('#uvColorcode').css('background-color','yellow');
    $('#uvColorcode').css('color','black');
  } else if (+uvIndex > 10) {
    $('#uvColorcode').css('background-color','red');
    $('#uvColorcode').css('color','white');
  }
}

function printDay1Weather(temp, wind, humidity, icon, date) {
  $('#day1Date').text(date);
  $('#day1Icon').attr('src',icon);
  $('#day1Temp').text(temp);
  $('#day1Wind').text(wind);
  $('#day1Humid').text(humidity);
}

function printDay2Weather(temp, wind, humidity, icon, date) {
  $('#day2Date').text(date);
  $('#day2Icon').attr('src',icon);
  $('#day2Temp').text(temp);
  $('#day2Wind').text(wind);
  $('#day2Humid').text(humidity);
}

function printDay3Weather(temp, wind, humidity, icon, date) {
  $('#day3Date').text(date);
  $('#day3Icon').attr('src',icon);
  $('#day3Temp').text(temp);
  $('#day3Wind').text(wind);
  $('#day3Humid').text(humidity);
}

function printDay4Weather(temp, wind, humidity, icon, date) {
  $('#day4Date').text(date);
  $('#day4Icon').attr('src',icon);
  $('#day4Temp').text(temp);
  $('#day4Wind').text(wind);
  $('#day4Humid').text(humidity);
}

function printDay5Weather(temp, wind, humidity, icon, date) {
  $('#day5Date').text(date);
  $('#day5Icon').attr('src',icon);
  $('#day5Temp').text(temp);
  $('#day5Wind').text(wind);
  $('#day5Humid').text(humidity);
}

