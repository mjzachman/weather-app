// open weather api key: 9a5cb4cb24bcfea0cbc3a84d7e907708
// url for open weather
// https://api.openweathermap.org/data/2.5/weather?q=LOCATION&APPID=APIKEY

const myLocation = 'London';

async function getData (location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=9a5cb4cb24bcfea0cbc3a84d7e907708`, { mode: 'cors' });
    return response.json();
}

function KtoC (temp) {
    return `${Math.round(temp - 273.15).toString()}\u00B0C`;
}

function KtoF (temp) {
    return `${Math.round(1.8 * (temp - 273.15) + 32).toString()}\u00B0F`;
}

function calcTime (timezone) {
    const d = new Date();
    return Date(d.getTime() + (d.getTimezoneOffset() * 60000) + (1000 * timezone));
}

function processData (data) {
    const newData = {
        location: data.name,
        time: calcTime(data.timezone).substring(0,21),
        weather: data.weather[0].main,
        weatherDesc: data.weather[0].description,
        tempC: KtoC(data.main.temp),
        highC: KtoC(data.main.temp_max),
        lowC: KtoC(data.main.temp_min),
        tempF: KtoF(data.main.temp),
        highF:  KtoF(data.main.temp_max),
        lowF: KtoF(data.main.temp_min),
        windSpeed: data.wind.speed,
        windDirec: data.wind.deg
    };
    return newData;
}

function locationForm () {
    const userLocation = 'the location the user inputted';

    return userLocation;
}

function displayData (data) {
    content = document.getElementById('content');
    city = document.createElement('p');
    temp = document.createElement('p');
    time = document.createElement('p');
    info = document.createElement('div');
    
   
    temp.setAttribute('id','weather');
    temp.textContent = `${data.tempF} ${data.weather}`;

    city.setAttribute('id', 'city');
    city.textContent = data.location;

    time.setAttribute('id', 'time');
    time.textContent = data.time;

    info.setAttribute('id', 'info-div');
    info.appendChild(city);
    info.appendChild(time);
    
    content.appendChild(temp);
    content.appendChild(info);
    

    console.log(data);
}

async function main () {
    const rawData = await getData(myLocation);
    const weatherData = processData(rawData);
    displayData(weatherData);
}

main();