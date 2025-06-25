# Dynamical-Weather-Forecast

README

This is a html and JavaScript source-code for a Weather Dashboard allows user to search for a 5-day weather forecast by city name. On submitting a city, the search record is reserved as a new button added below the search form. The weather data are requested from the resource from the OpenWeather One Call API under free-user account. The app is also powered by jQuery, BootStrap.css and date management from Moment.js API. 

The completed html and JavaScript source-code are available in the following Github repo as Master branch @, 
https://github.com/mikehui1124/challenge_6_dynamical-weather-forecast

The deployed URL of webpage is available in Github Page @ 
https://mikehui1124.github.io/challenge_6_dynamical-weather-forecast/

•	index.html

•	script.js

•	style.css


Brief description

When a new search is submitted from input form, the weather conditions for today and the next 5 days will display on the main page by the city name. Also, a named button is added underneath to store as search record. When the button is clicked, it proceed to a fresh fetch call to the API by the specified city, that is followed by displaying the weather results on the main page.
On refreshing the page, the search records by city name are retrieved from localStorage and  display beneath the search form, and hence all past searches retains on the page

Snapshot of the Weather dashboard

![image](https://user-images.githubusercontent.com/105307687/183969780-d7c16868-4a3e-4dee-b0e0-44ccc99248cc.png)


Acceptance criteria

The application will meet the following criteria expected by a traveller,


-	The page contains an input form to receive and submit city name 
-	When searching for city, I’m presented with current and next five-day weather conditions for that city and the city name is added to search history
-	When viewing current weather conditions for a city, I’m presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index.
-	When viewing the UV index, I am presented with a color that indicates whether the condition is favorable, moderate, or severe.
-	When viewing future weather condition for that city, I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
-	When clicking on a search history for a city, I am again presented with current and future conditions for that city.
-	When refreshing the page, the search history retains on the page.
