import {
    dom,
} from './constants.js'

import {
    getCurrentLang,
    getRainChance,
    getSnowChance,
    normalizeText,
    getAppState,
} from './utils.js';

import {
    showContent,
    updateAppState,
    switchAppStates,
} from './dom-handlers.js';


const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://weather-app-server-v8q4.onrender.com';

// Fetch weather data from API
const fetchWeather = async (city) => {
    try {
        const url = `${API_BASE}/api?q=${city}&t=${new Date().getTime()}`;
        const res = await fetch(url);

        if (res.status === 200) return await res.json();
        if (res.status === 429) throw new Error('Too Many Requests');
        if (res.status === 500) throw new Error('City Not Found');

    } catch (error) {
        const appState = getAppState(error);
        console.log(error);
        console.log(appState);
        updateAppState(appState);
        switchAppStates();

        if (appState === 'no_internet') throw new Error('Website stopped due to lack of internet');
        if (appState === 'too_many_requests') throw new Error('Too Many Requests');
        if (appState === 'city_not_found') throw new Error('City Not Found');
    }
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
        if (res.status === 429) throw new Error('Too Many Requests');
    } catch (error) {
        console.warn("Nominatim blocked/failed, switching to Open-Meteo...");
        url = OPEN_METEO_API_URL;

        try {
            res = await fetch(url);
        } catch {
            if (res === undefined) {
                const appState = getAppState(error);
                updateAppState(appState);
                switchAppStates();

                if (appState === 'too_many_requests') throw new Error('Too Many Requests');
                if (appState === 'no_internet') throw new Error('Website stopped due to lack of internet');
            }
        }
    }

    const data = await res.json();
    const cityPath = data[0]?.name ?? data.results?.[0]?.name;
    const translatedCity = normalizeText([cityPath]);

    return translatedCity;
}

const getSearchHints = async (query) => {
    const lang = getCurrentLang();

    try {
        const url = `https://photon.komoot.io/api/?q=${query}&limit=5&lang=${lang}&layer=city`;
        const res = await fetch(url);
        const data = await res.json();
        return data.features;
    } catch (error) {
        return 'Photon is temporary unavailable';
    }
}



export {
    fetchWeather,
    getWeatherParams,
    translateCity,
    getSearchHints,
}