const weatherDom = document.querySelector(".geo");
const API_KEY = "20e65942667f7e4a4b7ef85d1ac24b02";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const location = json.name;
      const weather = json.weather[0].description;
      const icon = json.weather[0].icon;
      weatherDom.querySelector(".location").innerText = location;
      weatherDom.querySelector(".temperature").innerText = temperature;
      weatherDom.querySelector(".weather").innerText = `-${weather}-`;
      fetch(`https://openweathermap.org/img/wn/${icon}.png`)
        .then(function (response) {
          return response.url;
        })
        .then(function (url) {
          const img = weatherDom.querySelector("img");
          img.src = url;
        });
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoordes = JSON.parse(loadedCoords);
    getWeather(parseCoordes.latitude, parseCoordes.longitude);
  }
}

function init() {
  loadCoords();
}

init();
