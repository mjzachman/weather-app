// open weather api key: 9a5cb4cb24bcfea0cbc3a84d7e907708
// url for open weather
// https://api.openweathermap.org/data/2.5/weather?q=LOCATION&APPID=APIKEY



async function getData (location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=9a5cb4cb24bcfea0cbc3a84d7e907708`, { mode: 'cors' });
    const data = await response.json();
    return data;
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

function process (data) {
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

function display(data) {
    const content = document.getElementById('content');
    const city = document.createElement('p');
    const weather = document.createElement('p');
    const time = document.createElement('p');
    const info = document.createElement('div');
    
   
    weather.setAttribute('id','weather');
    weather.textContent = `${data.tempF} ${data.weather}`;

    city.setAttribute('id', 'city');
    city.textContent = data.location;

    time.setAttribute('id', 'time');
    time.textContent = data.time;

    info.setAttribute('id', 'info-div');
    info.appendChild(city);
    info.appendChild(time);
    
    content.appendChild(weather);
    content.appendChild(info);
}

function update(data) {
    const content = document.getElementById('content');
    const city = document.getElementById('city');
    const weather = document.getElementById('weather');
    const time = document.getElementById('time');

    weather.textContent = `${data.tempF} ${data.weather}`;
    city.textContent = data.location;
    time.textContent = data.time;
}


function validate(event) {
    event.preventDefault();
    const userLocation = document.querySelector('#user-city').value;
    return userLocation;
}

async function main () {
    let myLocation = 'Cincinnati';
    let rawData = await getData(myLocation);
    let weatherData = process(rawData);
    display(weatherData);


    const submit = document.querySelector('button');
    submit.addEventListener('click', async function submit(e) {
        myLocation = validate(e);
        rawData = await getData(myLocation);
        weatherData = process(rawData);
        update(weatherData);
    })

   
}

main();