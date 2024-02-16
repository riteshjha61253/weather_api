const apiKey ="b03ae4bbec3b26a83cf576e454748e4e"
const URL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
async function checkWeather(city){
    const response = await fetch(URL + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".Wind").innerHTML=data.wind.speed + "km/h";
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/Clear.png";
    }
    if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
    // if(data.weather[0].main == "Clouds"){
    //     weatherIcon.src = "images/clouds.png";
    // }
    // if(data.weather[0].main == "Clouds"){
    //     weatherIcon.src = "images/clouds.png";
    // }

}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);    
});