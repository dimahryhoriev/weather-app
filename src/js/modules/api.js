import {
    dom,
} from './constants.js'

import {
    getCurrentLang,
    getRainChance,
    getSnowChance,
} from './utils.js';

const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : '';

// Fetch weather data from API
const fetchWeather = async (city) => {
    const url = `${API_BASE}/api?q=${city}&t=${new Date().getTime()}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

const getWeatherParams = async () => {
    console.log(dom.search.input.value);
    const translatedCity = await translateCity(dom.search.input.value, 'en');
    const weatherData = await fetchWeather(translatedCity);
    const localTime = weatherData.location.localtime.replace(' ', 'T');
    console.log(weatherData);

    return {
        current: {
            city: weatherData.location.name,
            date: new Date(localTime),
            temp: Math.round(weatherData.current.temp_c),
            dayIndex: weatherData.forecast.forecastday[0],
            cloud: ['cloud', (hour) => {
                return weatherData.forecast.forecastday[0].hour[hour].cloud;
            }],
            rain: ['rain', (hour) => getRainChance(weatherData, hour)],
            snow: ['snow', (hour) => getSnowChance(weatherData, hour)],
        },

        details: {
            maxTemp: Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c),
            minTemp: Math.round(weatherData.forecast.forecastday[0].day.mintemp_c,),
            humidity: weatherData.current.humidity,
            cloud: weatherData.current.cloud,
            wind: Math.round(weatherData.current.wind_kph),
        },
    }
}

const translateCity = async (city, requestedLang = false) => {
    // OPEN API - photon.komoot.io/api/?q=city&lang=en

    const currentLang = requestedLang || getCurrentLang();
    const CITY_API_BASE = 'https://nominatim.openstreetmap.org/search?';
    const url = `${CITY_API_BASE}q=${encodeURIComponent(city)}&format=json&accept-language=${currentLang}&limit=1`;
    console.log(url);

    const res = await fetch(url, { headers: { 'User-Agent': 'weather-app' } });
    const data = await res.json();
    console.log(data);
    const translatedCity = data[0].name;

    return translatedCity;
}


export {
    fetchWeather,
    getWeatherParams,
    translateCity,
}