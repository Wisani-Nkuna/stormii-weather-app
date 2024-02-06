function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let humidity = document.querySelector("#current-temp-humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  let windSpeed = document.querySelector("#current-wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;

  let iconURL = document.querySelector(".current-temperature-icon");
  iconURL.innerHTML = `<img src="${response.data.condition.icon_url}">`;

  let weatherDescription = document.querySelector(
    "#current-weather-description"
  );
  weatherDescription.innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);
}

function getCurrentWeather(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  getWeeklyForecast(city);
}

function getWeeklyForecast(city) {
  let apiKey = "3tcdfcc017dea9cdbe9d0e0fc6o488d7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let days = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];
  let date = new Date(timestamp * 1000);

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col-sm-2">
              <div class="weather-forecast-day" style="text-align:center">${formatDay(
                day.time
              )}</div>
              <img
                src=${day.condition.icon_url}
                width="50"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"><strong>${Math.round(
                  day.temperature.maximum
                )}º</strong>  </span>
                <span class="weather-forecast-temperature-min"><em>${Math.round(
                  day.temperature.minimum
                )}º</em>  </span>
              </div>
            </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCurrentWeather);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

displayForecast();
