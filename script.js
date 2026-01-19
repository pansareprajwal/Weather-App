/*
 🌤️ Interactive Weather App (with Enter key support)
 -------------------------------------------------
 🔑 API Setup:
 1. Go to https://openweathermap.org/api
 2. Sign up and generate a free API key.
 3. Replace YOUR_API_KEY below with your actual key (inside quotes).
 -------------------------------------------------
*/

const apiKey = "ebf7c1e2313c119ae150b2f6a63dff66"; // 🔧 Replace with your OpenWeatherMap API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

// ✅ Trigger search on button click
searchBtn.addEventListener("click", fetchWeather);

// ✅ Trigger search when pressing Enter
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchWeather();
  }
});

async function fetchWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    alert("⚠️ Please enter a city name!");
    return;
  }

  weatherResult.classList.add("hidden");
  loading.classList.remove("hidden");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    loading.classList.add("hidden");
    updateWeatherUI(data);
  } catch (error) {
    loading.classList.add("hidden");
    alert("❌ " + error.message + ". Please check the spelling or API key.");
  }
}

function updateWeatherUI(data) {
  const { name } = data;
  const { icon, description: desc } = data.weather[0];
  const { temp } = data.main;

  cityName.textContent = name;
  temperature.textContent = `🌡️ ${temp.toFixed(1)}°C`;
  description.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherResult.classList.remove("hidden");

  changeBackground(desc.toLowerCase());
}

function changeBackground(desc) {
  if (desc.includes("cloud")) {
    document.body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
  } else if (desc.includes("rain")) {
    document.body.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
  } else if (desc.includes("clear")) {
    document.body.style.background = "linear-gradient(135deg, #56ccf2, #2f80ed)";
  } else if (desc.includes("snow")) {
    document.body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
  } else if (desc.includes("mist")) {
    document.body.style.background = "linear-gradient(135deg, #606c88, #3f4c6b)";
  } else {
    document.body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
  }
}
