```javascript
const apiKey = "b03ae4bbec3b26a83cf576e454748e4e"; // Replace with a valid API key if testing locally
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.createElement("input"); // Create dummy elements for testing
searchBox.classList.add("search");
searchBox.value = ""; //Start with empty search box.

const searchBtn = document.createElement("button");
searchBtn.classList.add("search");

const weatherIcon = document.createElement("img");
weatherIcon.classList.add("weather-icon");
weatherIcon.src = ""; //Start with empty image.

document.body.appendChild(searchBox);
document.body.appendChild(searchBtn);
document.body.appendChild(weatherIcon);

document.querySelector(".city") = document.createElement("div");
document.querySelector(".city").classList.add("city");
document.querySelector(".temp") = document.createElement("div");
document.querySelector(".temp").classList.add("temp");
document.querySelector(".humidity") = document.createElement("div");
document.querySelector(".humidity").classList.add("humidity");
document.querySelector(".Wind") = document.createElement("div");
document.querySelector(".Wind").classList.add("Wind");
document.body.appendChild(document.querySelector(".city"));
document.body.appendChild(document.querySelector(".temp"));
document.body.appendChild(document.querySelector(".humidity"));
document.body.appendChild(document.querySelector(".Wind"));




async function checkWeather(city) {
    try {
        const response = await fetch(URL + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        var data = await response.json();
        // ... (rest of your checkWeather function remains the same) ...
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".Wind").innerHTML = "";
        weatherIcon.src = "images/default.png"; // Or any default image you have

    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


// Test cases
describe("checkWeather", () => {
    it("should handle invalid city name", async () => {
        searchBox.value = "asdfsadf";
        await checkWeather(searchBox.value);
        expect(document.querySelector(".city").innerHTML).toBe("City not found");
        expect(document.querySelector(".temp").innerHTML).toBe("");
        expect(document.querySelector(".humidity").innerHTML).toBe("");
        expect(document.querySelector(".Wind").innerHTML).toBe("");
        // Add assertion to check default icon
        expect(weatherIcon.src).toBe("images/default.png");  // Assuming you have a default.png

    });

    it("should handle non-existent city", async () => {
        searchBox.value = "NonExistentCity";
        await checkWeather(searchBox.value);
        expect(document.querySelector(".city").innerHTML).toBe("City not found");
        expect(document.querySelector(".temp").innerHTML).toBe("");
        expect(document.querySelector(".humidity").innerHTML).toBe("");
        expect(document.querySelector(".Wind").innerHTML).toBe("");
        // Add assertion to check default icon
        expect(weatherIcon.src).toBe("images/default.png");  // Assuming you have a default.png

    });

    it("should handle empty city input", async () => {
        searchBox.value = "";
        await checkWeather(searchBox.value);
        expect(document.querySelector(".city").innerHTML).toBe("City not found");
        expect(document.querySelector(".temp").innerHTML).toBe("");
        expect(document.querySelector(".humidity").innerHTML).toBe("");
        expect(document.querySelector(".Wind").innerHTML).toBe("");
        expect(weatherIcon.src).toBe("images/default.png");  // Assuming you have a default.png

    });


    // Add more test cases as needed for different invalid inputs.  
    //Consider testing for cases where the API response is malformed or unexpected.

});

//Remember to replace "images/default.png" with the actual path to your default image if you added one.  You'll also need a testing framework like Jest to run these tests.  This example uses Jest's expect syntax.
```