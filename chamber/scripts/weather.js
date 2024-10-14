const apiKey = 'dc0af233151c6eac43d3f32c0f160699';
const lat = '13.6929';
const lon = '-89.2182'; 

// Fetch weather and forecast data
async function getWeatherData() {

        // Current weather API
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();

        // 5-day forecast
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(weatherData);
        displayWeatherForecast(forecastData);

}

// Display current weather 
function displayCurrentWeather(data) {
    const weatherSection = document.querySelector('.home .item:nth-child(2)');
    const currentTemp = Math.round(data.main.temp); 
    const highTemp = Math.round(data.main.temp_max);
    const lowTemp = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;
    const sunrise = formatTime(data.sys.sunrise);
    const sunset = formatTime(data.sys.sunset);
    const weatherDescription = data.weather.map(event => capitalizeWords(event.description)).join(', '); 

    weatherSection.innerHTML = `
        <h2>Current Weather</h2>
        <div class="w-icon">

            <img src="images/wheather.png" alt="icon weather"></a>

            <div>

                <p>Temperature: ${currentTemp}°F</p>
                <p>${weatherDescription}</p>
                <p>High: ${highTemp}°F</p>
                <p>Low: ${lowTemp}°F</p>
                <p>Humidity: ${humidity}%</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
            </div>
                
        </div>

    `;
}

// Format sunrise and sunset times
function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function displayWeatherForecast(data) {
    const forecastSection = document.querySelector('.home .item:nth-child(3)');
    forecastSection.innerHTML = '<h2>Weather Forecast</h2>';

    const forecastDays = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    forecastDays.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp); 
        const description = day.weather.map(event => capitalizeWords(event.description)).join(', ');

        forecastSection.innerHTML += `
            <p>${date}: <strong>${temp}°F</p></strong>
        `;
    });
}

// Capitalize each word
function capitalizeWords(str) {
    return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

getWeatherData();

