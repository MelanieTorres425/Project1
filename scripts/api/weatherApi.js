// This is for the weather api only aspects of the website

function getMainForecast(city, isHotel, isRestaurant) {
  let queryUrlMain =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=b69a42c83210378fa102751081b2696f";

  $.ajax({
    url: queryUrlMain,
    method: "GET",
  }).then(function (response) {
    $(".main-fiveDay-weather-card").removeClass("hide");
    let cityName = response.name; // city name
    let tempK = response.main.temp; // temp in kelvin
    let tempF = tempK * (9 / 5) - 459.67;
    let humid = response.main.humidity; // humidity
    let windSpeed = response.wind.speed; // wind speed
    let weatherIcon = response.weather[0].icon; // weather icon
    displayMainForecast(cityName, humid, windSpeed, weatherIcon, tempF);
    let lat = response.coord.lat;
    let lon = response.coord.lon;
    get5DayForecast(lat, lon);

    if (isHotel === true && isRestaurant === true) {
      getHotelInfo(city);
      getRestaurantInfo(lat, lon);
    } else if (isRestaurant === false && isHotel === true) {
      getHotelInfo(city);
    } else if (isHotel === false && isRestaurant === true) {
      getRestaurantInfo(lat, lon);
    } else {
      return;
    }
  });
}

// grab 5 day forecast
function get5DayForecast(lati, long) {
  let queryUrl5Day =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lati +
    "&lon=" +
    long +
    "&exclude=current,minutely,hourly&appid=b69a42c83210378fa102751081b2696f";

  $.ajax({
    url: queryUrl5Day,
    method: "GET",
  }).then(function (response) {
    // Display the current day UV index
    let uvi = response.daily[0].uvi;
    $("#main-uv").text(uvi);
    if (uvi >= 11) {
      $("#main-uv").attr("style", "background-color: purple");
    } else if (uvi >= 8) {
      $("#main-uv").attr("style", "background-color: red");
    } else if (uvi >= 6) {
      $("#main-uv").attr("style", "background-color: orange");
    } else if (uvi >= 3) {
      $("#main-uv").attr("style", "background-color: yellow");
    } else {
      $("#main-uv").attr("style", "background-color: green");
    }

    // Getting data for the display Function
    let dailyDateArr = [];
    let dailyIconArr = [];
    let dailyTempArr = [];
    let dailyHumidArr = [];

    for (let i = 1; i < 6; i++) {
      dailyIconArr.push(response.daily[i].weather[0].icon);

      let tempK = response.daily[i].temp.max;
      let tempF = Math.ceil(tempK * (9 / 5) - 459.67);
      dailyTempArr.push(tempF);

      dailyHumidArr.push(response.daily[i].humidity);

      let date = response.daily[i].dt;
      let dailyDate = new Date(date * 1000).toLocaleDateString("en-US");
      dailyDateArr.push(dailyDate);
    }

    display5DayForecast(
      dailyDateArr,
      dailyIconArr,
      dailyTempArr,
      dailyHumidArr
    );
  });
}
// display weather info here
function displayMainForecast(city, humidity, windSpd, WeatherIcon, temp) {
  let now = moment().format("LL");
  // City title
  $(".main-title").text(city + " ");

  // todays date
  $("#current-date").text(now);

  // Weather icon
  $("#main-icon").empty();
  let createImg = $("<img>");
  createImg.attr("id", "main-icon");
  createImg.attr(
    "src",
    "http://openweathermap.org/img/wn/" + WeatherIcon + "@2x.png"
  );
  $("#main-icon").append(createImg);

  // temp
  $("#main-temp").text(Math.ceil(temp) + "\u00B0F");

  // humid
  $("#main-humid").text(humidity + "%");

  // wind
  $("#main-wind").text(windSpd + " MPH");

  // UV index will be displayed in the 5 day api since that one holds the uv index
}

function display5DayForecast(dailyTime, dailyIcon, dailyTempF, dailyHumid) {
  for (let i = 0; i < 5; i++) {
    // date
    let dateForecast = $("#fiveday-date-" + i);
    dateForecast.text(dailyTime[i]);
    // icon
    let iconForecast = $("#fiveday-icon-" + i);
    iconForecast.attr(
      "src",
      "http://openweathermap.org/img/wn/" + dailyIcon[i] + "@2x.png"
    );
    // temp
    let tempForecast = $("#5d-temperature-" + i);
    tempForecast.text(dailyTempF[i] + "\u00B0F");
    // Humidity
    let humidForecast = $("#5d-humidity-" + i);
    humidForecast.text(dailyHumid[i] + "%");
  }
}
