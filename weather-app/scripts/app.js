const bodyEl = document.querySelector("body");
const searchEl = document.querySelector(".search");
const locationEl = document.querySelector(".location");
const dateEl = document.querySelector(".date");
const currTempEl = document.querySelector(".curr-temp");
const weatherEl = document.querySelector(".weather");
const minMaxTempEl = document.querySelector(".min-max-temp");
const weatherReportEl = document.querySelector(".weather-report");
const hiddenBoxEl = document.querySelector(".hidden-box");

const wapikey = "beaddaccef681f63accef2a3ac211896";
let url;
let response;
let data;

bodyEl.addEventListener("load", setDefault());
searchEl.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    if (searchEl.value == "") setDefault();
    else updateRecords(`${searchEl.value}`);
  }
});

async function updateRecords(city) {
  url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${wapikey}&units=metric`;
  try {
    data = await fetchCityInfo(url);
    setDate();
    updateLocation(data);
    updateWeatherInfo(data);
    toggleAndClearSeach("grid", "none", true);
  } catch (error) {
    toggleAndClearSeach("none", "grid", false);
    hiddenBoxEl.textContent = `City ${city.toUpperCase()} not found!`;
  }
}

async function setDefault() {
  updateRecords("Delhi");
}

function setDate() {
  dateEl.textContent = dayjs().format("dddd D MMMM YYYY");
}

function toggleAndClearSeach(wrdisplay, hbdisplay, clearSearch) {
  weatherReportEl.style.display = `${wrdisplay}`;
  hiddenBoxEl.style.display = `${hbdisplay}`;
  if (clearSearch) searchEl.value = "";
}

async function fetchCityInfo(url) {
  response = await fetch(url);
  data = await response.json();
  return data;
}

function updateLocation(data) {
  locationEl.textContent = `${data.name}, ${data.sys.country}`;
}

function updateWeatherInfo(data) {
  currTempEl.textContent = `${Math.ceil(data.main.temp)}°c`;
  weatherEl.textContent = `${data.weather[0].main}`;
  minMaxTempEl.textContent = `${Math.ceil(data.main.temp_min)}°c / ${Math.ceil(
    data.main.temp_max
  )}°c`;
}
