import {
    dom,
} from './constants.js'

import {
    getRainChance,
    getSnowChance,
} from './utils.js';


// Fetch weather data from API
const fetchWeather = async (city) => {
    const url = `/api?q=${city}&t=${new Date().getTime()}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

const getWeatherParams = async () => {
    const weatherData = await fetchWeather(dom.search.input.value);
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


export {
    fetchWeather,
    getWeatherParams,
}