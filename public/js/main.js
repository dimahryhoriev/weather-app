import { dom, dayCycles } from './constants.js';
import { fetchWeather } from './weather-api.js';

// Show current weather by search query
function updateWeatherCurrent(currentWeather) {
    const { city, date, temp, cloudy } = currentWeather;

    dom.current.temp.textContent = temp;
    dom.current.city.textContent = city;
    dom.current.time.textContent = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    dom.current.weekDay.textContent = date.toLocaleString('en-US', { weekday: 'long' });
    dom.current.day.textContent = date.getDate();
    dom.current.month.textContent = date.toLocaleString('en-US', { month: 'short' });
    dom.current.year.textContent = date.getFullYear().toString().slice(-2);
}

// Show weather details by search query
function updateWeatherDetails(weatherDetails) {
    const { maxTemp, minTemp, humidity, cloud, wind } = weatherDetails;

    dom.details.maxTemp.textContent = Math.round(maxTemp);
    dom.details.minTemp.textContent = Math.round(minTemp);
    dom.details.humidity.textContent = humidity;
    dom.details.cloudy.textContent = cloud;
    dom.details.wind.textContent = Math.round(wind);
}

// Show next 12 hours weather forecast
function updateWeatherForecast(currentWeather) {
    const time = dom.current.time.textContent;
    const { day } = currentWeather;
    let [currentHour, currentMinute] = time.split(':').map(Number);

    for (let forecastCounter = 1; forecastCounter <= 12; forecastCounter++) {
        // Declare next forecast hour
        const template = dom.forecast.item.content.cloneNode(true);
        const nextHour = template.querySelector('[data-js="f-time"]');
        const nextTemp = template.querySelector('[data-js="f-temp"]');
        const nextDesc = template.querySelector('[data-js="f-desc"]');

        // Calculating the next hour
        currentHour = (currentHour + 1) % 24;
        const formattedHour = currentHour.toString().padStart(2, '0');
        const formattedMinute = currentMinute = '00';
        nextHour.textContent = `${formattedHour}:${formattedMinute}`;

        // Extract the temperature value for a specific hour
        const hourData = day.hour[currentHour];
        nextTemp.textContent = Math.round(hourData.temp_c);

        dom.forecast.list.appendChild(template);

        // Extract the weather icon for a specific hour
        // updateCurrentIcon(weatherParams, forecastHour, 'forecastIcon', nextDesc);
    }
}

// Change icon relying on current weather & time
function updateCurrentIcon(cloudyData, currentHour, type, desc) {
    if (type === 'currentIcon') {
        cloudyData = weatherParams.current.cloud;
    } else {
        cloudyData = weatherParams.forecast.forecastday[0].hour[currentHour].cloud;
    }

    let isDay;
    let isNight;
    let iconPath = '';
    let backgroundPath = '';
    let currentMonth = dom.current.month.textContent;

    let weatherConfig = {
        cloudy: {
            clear: ['clear', 'Sunny', 'Clear'],
            partly: ['partly-cloudy', 'Partly Cloudy'],
            mostly: ['mostly-cloudy', 'Mostly Cloudy'],
            overcast: ['overcast', 'Overcast'],
        },

        time: 'day'
    }

    if (currentMonth in dayCycles) {
        isDay = currentHour >= dayCycles[currentMonth].startOfDay
            && currentHour <= dayCycles[currentMonth].endOfDay;
        isNight = !isDay;

        if (isNight) {
            weatherConfig.time = 'night';
        }
    }

    const cloudyValues = weatherConfig.cloudy;

    function setIconPath(weather, time = weatherConfig.time) {
        iconPath = `url('assets/icons/${time}/${weather[0]}.svg')`;
        backgroundPath = `url('assets/images/${time}/${weather[0]}.jpg')`;
        if (desc) {
            if (weatherConfig.time === 'day') {
                desc.textContent = weather[1];
            } else if (weatherConfig.time === 'night' && weather[0] === 'clear') {
                desc.textContent = weather[2];
            } else {
                desc.textContent = weather[1];
            }
        }
    }

    switch (true) {
        case cloudyData <= 25: setIconPath(cloudyValues.clear);
            break;

        case cloudyData <= 45: setIconPath(cloudyValues.partly);
            break;

        case cloudyData <= 70: setIconPath(cloudyValues.mostly);
            break;

        case cloudyData <= 100: setIconPath(cloudyValues.overcast);
            break;
    }

    if (type === 'currentIcon') {
        dom.current.icon.style.backgroundImage = iconPath;
        dom.current.background.style.backgroundImage = backgroundPath;
    } else {
        const allForecastIcons = document.querySelectorAll('[data-js="f-icon"]');
        const newestForecastIcon = allForecastIcons[allForecastIcons.length - 1];
        newestForecastIcon.style.backgroundImage = iconPath;
    }
}


// Get user's search result
dom.search.form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        dom.forecast.list.innerHTML = '';

        const getWeatherParams = async () => {
            const weatherData = await fetchWeather(dom.search.input.value);
            const localTime = weatherData.location.localtime.replace(' ', 'T');
            console.log(weatherData);

            return {
                current: {
                    city: weatherData.location.name,
                    date: new Date(localTime),
                    temp: Math.round(weatherData.current.temp_c),
                    cloud: weatherData.current.cloud,
                    day: weatherData.forecast.forecastday[0],
                },

                details: {
                    maxTemp: weatherData.forecast.forecastday[0].day.maxtemp_c,
                    minTemp: weatherData.forecast.forecastday[0].day.mintemp_c,
                    humidity: weatherData.current.humidity,
                    cloud: weatherData.current.cloud,
                    wind: weatherData.current.wind_kph,
                },
            }
        }

        const weatherParams = await getWeatherParams();
        console.log(weatherParams);

        updateWeatherCurrent(weatherParams.current);
        updateWeatherDetails(weatherParams.details);
        updateWeatherForecast(weatherParams.current);
        updateCurrentIcon(cloudyData, currentHour, 'currentIcon');

    } catch (error) {
        console.error('Error fetching weather data: ', error);
    }
})

dom.search.form.addEventListener('input', (event) => {
    event.preventDefault();

    if (dom.search.input.value.length >= 1) {
        dom.search.submitBtn.style.display = 'none';
        dom.search.resetBtn.style.display = 'flex';
    } else {
        dom.search.submitBtn.style.display = 'flex';
        dom.search.resetBtn.style.display = 'none';
    }
})

dom.search.form.addEventListener('reset', (event) => {
    event.preventDefault();

    dom.search.submitBtn.style.display = 'flex';
    dom.search.resetBtn.style.display = 'none';
    dom.search.input.value = '';
})