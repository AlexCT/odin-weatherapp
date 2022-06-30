// Alex Tresselt 6-26-22


async function getWeather() {
    // Get city location from text field
    let loc = document.querySelector('#locationbtn').value;

    // Use Openweathermap's Geocoding API to translate city to lat/long coordinates
    const reply = await
        fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + loc + '&limit=1&appid=ecf75d04121014476b6bddba9c305734',
        {mode: 'cors'});
    const cityData = await reply.json();
    let lat = cityData[0].lat;
    let lon = cityData[0].lon;

    // Get the weather data from Openweathermap's API
    const response = await 
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + 
            '&lon=' + lon + '&appid=ecf75d04121014476b6bddba9c305734&units=imperial', 
        {mode: 'cors'});
    const weatherData = await response.json();

    // Display City name
    const city = document.querySelector('#city');
    city.innerHTML = weatherData.name;
    // Display weather icon, using Openweathermap's icons
    const img = document.querySelector('#weather');
    img.src = "https://openweathermap.org/img/wn/" + 
                weatherData.weather[0].icon + "@4x.png";
    // Display temperature, rounded to nearest degree
    const temp = document.querySelector('#temp');
    temp.innerHTML = Math.round(weatherData.main.temp) + "\u00B0F";
    // Display conditions
    const conditions = document.querySelector('#conditions');
    conditions.innerHTML = weatherData.weather[0].description;

}


document.getElementById("submitbtn").onclick = function () { 
    getWeather();
 };

