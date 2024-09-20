const apiKey = "8ca1c1e75e0f72334ad8424cb26ea5d7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const videoBackground = document.querySelector(".video-background");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
    document.querySelector(".visibility").innerHTML = (data.visibility / 1000) + " km";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
    document.querySelector(".sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.querySelector(".sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
        changeVideoBackground("clouds");
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
        changeVideoBackground("clear");
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
        changeVideoBackground("rain");
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
        changeVideoBackground("drizzle");
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
        changeVideoBackground("mist");
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png";
        changeVideoBackground("snow");
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}

function changeVideoBackground(condition) {
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
    return condition.toLowerCase();
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

document.querySelector(".more-details-btn").addEventListener("click", () => {
    const city = document.querySelector(".city").innerText;
    const condition = videoBackground.src.split('/').pop().split('.')[0];
    window.location.href = `forecast.html?city=${encodeURIComponent(city)}&condition=${encodeURIComponent(condition)}`;
});