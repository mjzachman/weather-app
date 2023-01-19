// open weather api key: 9a5cb4cb24bcfea0cbc3a84d7e907708
// url for open weather
// https://api.openweathermap.org/data/2.5/weather?q=LOCATION&APPID=APIKEY

const myLocation = 'London';

async function getData (location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=9a5cb4cb24bcfea0cbc3a84d7e907708`, { mode: 'cors' });
    return response.json();
}

function processData (data) {
    const newData = {
        location: data.name,
        timezone: data.timezone,
        weather: data.weather[0].main,
        weatherDesc: data.weather[0].description,
        temp: data.main.temp,
        high: data.main.temp_max,
        low: data.main.temp_min,
        windSpeed: data.wind.speed,
        windDirec: data.wind.deg
    };
    return newData;
}

function locationForm () {
    const userLocation = 'the location the user inputted';

    return userLocation;
}

function displayData (newData) {
    console.log(newData);
}

async function main () {
    const rawData = await getData(myLocation);
    const weatherData = processData(rawData);
    console.log(weatherData);
}

main();