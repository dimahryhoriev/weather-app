import { dom, dayCycles, weatherConfig } from './constants.js';
import { fetchWeather } from './weather-api.js';

// Show current weather by search query
function updateWeatherCurrent(currentWeather) {
    const { city, date, temp, cloud } = currentWeather;

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

    updateCurrentVisuals(cloud[0], cloud[1]);
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
    let { currentHour, currentMinute } = getCurrentTime();
    let { dayIndex } = currentWeather;

    for (let forecastCounter = 1; forecastCounter <= 24; forecastCounter++) {
        // Declare next forecast hour
        const template = dom.forecast.item.content.cloneNode(true);
        const nextHour = template.querySelector('[data-js="f-time"]');
        const nextTemp = template.querySelector('[data-js="f-temp"]');
        const nextDesc = template.querySelector('[data-js="f-desc"]');
        const nextIcon = template.querySelector('[data-js="f-icon"]');

        // Calculating the next hour
        currentHour = (currentHour + 1) % 24;
        const formattedHour = currentHour.toString().padStart(2, '0');
        const formattedMinute = currentMinute = '00';
        nextHour.textContent = `${formattedHour}:${formattedMinute}`;

        // Extract the temperature value for a specific hour
        const nextHourData = dayIndex.hour[currentHour];
        const nextCloud = dayIndex.hour[currentHour].cloud;
        nextTemp.textContent = Math.round(nextHourData.temp_c);

        dom.forecast.list.appendChild(template);

        // Extract the weather icon & description for a specific hour
        const dayPeriod = setDayCycle(currentHour);
        const visualsData = updateForecastVisuals(dayPeriod, 'cloud', nextCloud);
        const iconPath = visualsData[0];
        const weatherStatus = visualsData[1];

        nextIcon.style.backgroundImage = iconPath;
        nextDesc.textContent = weatherStatus;
    }
}

function updateForecastVisuals(dayPeriod, weatherFactor, percentage) {
    const weatherStatus = getWeatherStatus(weatherFactor, percentage);
    const { iconPath } = generateAssetPath(weatherStatus, dayPeriod);

    if (dayPeriod === 'night' && weatherStatus[0] === 'clear') {
        return [iconPath, weatherStatus[2]];
    } else {
        return [iconPath, weatherStatus[1]];
    }
}

// Update icon in current weather UI
function updateCurrentVisuals(weatherFactor, percentage) {
    let { currentHour } = getCurrentTime();
    const dayPeriod = setDayCycle(currentHour);
    const weatherStatus = getWeatherStatus(weatherFactor, percentage);

    const { iconPath, backgroundPath } = generateAssetPath(weatherStatus, dayPeriod);

    dom.current.icon.style.backgroundImage = iconPath;
    dom.current.background.style.backgroundImage = backgroundPath;
}

function generateAssetPath(weatherStatus, dayPeriod) {
    let iconPath = '';
    let backgroundPath = '';

    iconPath = `url('assets/icons/${dayPeriod}/${weatherStatus[0]}.svg')`;
    backgroundPath = `url('assets/images/background/${dayPeriod}/${weatherStatus[0]}.jpg')`;

    return { iconPath, backgroundPath };
}

function getCurrentTime() {
    const time = dom.current.time.textContent;
    let [currentHour, currentMinute] = time.split(':').map(Number);

    return { currentHour, currentMinute };
}

function setDayCycle(currentHour) {
    const currentMonth = dom.current.month.textContent;
    let isDay;
    let isNight;
    let dayPeriod = 'day';

    if (currentMonth in dayCycles) {
        isDay = currentHour >= dayCycles[currentMonth].startOfDay
            && currentHour <= dayCycles[currentMonth].endOfDay;
        isNight = !isDay;

        if (isNight) {
            dayPeriod = 'night';
        }
    }

    return dayPeriod;
}

function getWeatherStatus(weatherFactor, percentage) {
    const factorData = weatherConfig[weatherFactor];
    if (!factorData) {
        console.error(`Invalid factor data: ${weatherFactor}`);
        return null;
    }

    if (percentage <= 25) return factorData.clear;
    if (percentage <= 45) return factorData.partly;
    if (percentage <= 70) return factorData.mostly;
    if (percentage <= 100) return factorData.overcast;

    console.error(`Invalid factor percentage: ${percentage}`);
    return null;
}

function showContent() {
    // Hide default sections
    dom.current.section.default.classList.add('is-hidden');
    dom.placeholder.section.classList.add('is-hidden');

    // Show sections with UI elements
    dom.current.section.active.classList.remove('is-hidden');
    dom.details.section.classList.remove('is-hidden');
    dom.forecast.section.classList.remove('is-hidden');
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
                    cloud: ['cloud', weatherData.current.cloud],
                    dayIndex: weatherData.forecast.forecastday[0],
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
        showContent();

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