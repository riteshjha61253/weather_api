```javascript
const apiKey ="b03ae4bbec3b26a83cf576e454748e4e";
const URL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityDisplay = document.querySelector(".city");
const tempDisplay = document.querySelector(".temp");
const humidityDisplay = document.querySelector(".humidity");
const windDisplay = document.querySelector(".Wind");
const errorDisplay = document.createElement('div'); // Element to display error messages
errorDisplay.classList.add('error'); // Add a class for styling

// Add the error display element to the DOM (e.g., append to body)
document.body.appendChild(errorDisplay);


async function checkWeather(city){
    errorDisplay.textContent = ''; // Clear previous error messages

    try {
        const response = await fetch(URL + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        var data = await response.json();
        console.log(data);
        cityDisplay.innerHTML=data.name;
        tempDisplay.innerHTML=Math.round(data.main.temp) + "°C";
        humidityDisplay.innerHTML=data.main.humidity + "%";
        windDisplay.innerHTML=data.wind.speed + "km/h";
        setWeatherIcon(data.weather[0].main);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorDisplay.textContent = "Error: Could not retrieve weather data. Please check your network connection and try again.";
    }
}


function setWeatherIcon(main) {
    switch (main) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/Clear.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
        default:
            weatherIcon.src = ""; // Or a default icon
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);    
});


// Test Cases (using Jest)

describe('checkWeather', () => {
  it('should handle successful API call', async () => {
    // Mock the fetch function for a successful response (replace with your test data)
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        name: "London",
        main: { temp: 15, humidity: 70 },
        wind: { speed: 10 },
        weather: [{ main: "Clouds" }]
      })
    }));

    await checkWeather("London");
    expect(cityDisplay.textContent).toBe("London");
    expect(tempDisplay.textContent).toBe("15°C");
  });

  it('should handle network error', async () => {
    // Mock the fetch function to simulate a network error
    global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));
    await checkWeather("London");
    expect(errorDisplay.textContent).toBe("Error: Could not retrieve weather data. Please check your network connection and try again.");
  });


  it('should handle HTTP error', async () => {
    // Mock the fetch function to simulate an HTTP error (e.g., 404)
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 404,
      statusText: "Not Found",
    }));

    await checkWeather("London");
    expect(errorDisplay.textContent).toContain("HTTP error!");
  });
});

```

To run these tests, you'll need to have Jest installed (`npm install --save-dev jest`).  Create an `index.html` file with the necessary HTML elements (search input, button, and divs for displaying weather data) to match the selectors in the JavaScript code.  Remember to replace `"images/clouds.png"`, etc. with actual paths to your image files.  The test uses `global.fetch = jest.fn(...)` to mock the `fetch` API.  For more robust testing in a real browser environment, you could look into tools like Cypress or Puppeteer.  These allow you to test the interactions with the page more completely, including simulating network conditions.
