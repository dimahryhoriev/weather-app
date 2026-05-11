import {
    dom,
} from './constants.js'

import {
    getCurrentLang,
    getRainChance,
    getSnowChance,
    normalizeText,
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
    const translatedCity = await translateCity(dom.search.input.value, 'en');

    const weatherData = await fetchWeather(translatedCity);
    const localTime = weatherData.location.localtime.replace(' ', 'T');
    console.log(weatherData);

    return {
        current: {
            city: translatedCity,
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
    const currentLang = requestedLang || getCurrentLang();
    const NOMINATIM_API_URL = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&accept-language=${currentLang}&limit=1`;
    const OPEN_METEO_API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=${currentLang}`;
    let url = NOMINATIM_API_URL;
    let res;

    try {
        res = await fetch(url, { headers: { 'User-Agent': 'weather-app' } });
        if (!res.ok) throw new Error('Nominatim failed');
    } catch {
        console.warn("Nominatim blocked/failed, switching to Open-Meteo...");
        url = OPEN_METEO_API_URL;
        console.log(url);
        res = await fetch(url);
    }

    const data = await res.json();
    console.log(data);
    const cityPath = data[0]?.name ?? data.results?.[0]?.name;
    const translatedCity = normalizeText([cityPath]);

    return translatedCity;
}


export {
    fetchWeather,
    getWeatherParams,
    translateCity,
}