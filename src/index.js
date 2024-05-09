function formatDate() {
  let date = new Date();

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];

  let formattedDate = `${day} ${hour}:${minute}`;
  let now = document.querySelector("#nowTime");
  now.innerHTML = formattedDate;
}

formatDate();

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city");
  let name = document.querySelector("h2");
  name.innerHTML = city.value;
  searchCity(city);
  formatDate();
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityInput = response.data.name;
  let humid = response.data.main.humidity;
  let windy = Math.round(response.data.wind.speed);

  let city = document.querySelector("#city");
  let displayTemp = document.querySelector("#weather");
  let humidity = document.querySelector("#humid");
  let windSpeed = document.querySelector("#wind");
  let description = document.querySelector("#condition");

  description.innerHTML = response.data.weather[0].main;
  city.innerHTML = `${cityInput}`;
  displayTemp.innerHTML = `${temperature}`;
  humidity.innerHTML = `${humid}%`;
  windSpeed.innerHTML = `${windy} km/h`;
}

function searchCity(city) {
  let apiKey = "1fe785ac5639f522853d21f921fefa5e";
  let cityInput = document.querySelector("#enter-city").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#form-input");
form.addEventListener("submit", search);

function searchCurrent(city) {
  let apiKey = "1fe785ac5639f522853d21f921fefa5e";
  let units = "metric";
  let latitude = city.coords.latitude;
  let longitude = city.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
  formatDate();
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);
