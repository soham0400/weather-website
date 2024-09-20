const apiKey = "8ca1c1e75e0f72334ad8424cb26ea5d7";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

// Get the city name from URL
const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city');
const condition = urlParams.get('condition');

// Set the video background based on the condition
const videoBackground = document.querySelector('.video-background');
function setVideoBackground(condition) {
    let videoUrl = "";
    switch (condition) {
        case "clouds":
            videoUrl = "videos/clouds.mp4";
            break;
        case "clear":
            videoUrl = "videos/clear.mp4";
            break;
        case "rain":
            videoUrl = "videos/rain.mp4";
            break;
        case "drizzle":
            videoUrl = "videos/drizzle.mp4";
            break;
        case "mist":
            videoUrl = "videos/mist.mp4";
            break;
        case "snow":
            videoUrl = "videos/snow.mp4";
            break;
        default:
            videoUrl = "videos/default.mp4";
    }
    videoBackground.src = videoUrl;
    videoBackground.load();
}

setVideoBackground(condition);

// Fetch and update forecast data
async function fetchForecast(city) {
    const response = await fetch(forecastApiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    
    document.querySelector(".forecast-city").innerText = data.city.name;

    // Update each forecast card with data for 5 days (every 24 hours)
    const forecastList = document.querySelectorAll(".forecast-card");

    for (let i = 0; i < forecastList.length; i++) {
        const dayData = data.list[i * 8];  // Pick data for every 24 hours (8 * 3 hours = 24 hours)
        
        // Update the forecast card with dayData
        forecastList[i].querySelector(".date").innerText = new Date(dayData.dt * 1000).toLocaleDateString();
        forecastList[i].querySelector(".temp").innerText = dayData.main.temp + "°C";
        forecastList[i].querySelector(".description").innerText = dayData.weather[0].description;
        forecastList[i].querySelector(".humidity").innerText = dayData.main.humidity + "%";
        forecastList[i].querySelector(".wind").innerText = dayData.wind.speed + " km/hr";
        forecastList[i].querySelector(".pressure").innerText = dayData.main.pressure + " hPa";
        forecastList[i].querySelector(".visibility").innerText = (dayData.visibility / 1000) + " km";
        forecastList[i].querySelector(".sunrise").innerText = + new Date(data.city.sunrise * 1000).toLocaleTimeString();
        forecastList[i].querySelector(".sunset").innerText = + new Date(data.city.sunset * 1000).toLocaleTimeString();
        forecastList[i].querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/" + dayData.weather[0].icon + "@2x.png";
    }
}

fetchForecast(city);
