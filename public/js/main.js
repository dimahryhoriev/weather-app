import { dom, dayCycles, weatherConfig } from './constants.js';
import { fetchWeather } from './weather-api.js';
import { useFade } from './animations.js';

// Show current weather by search query
function updateWeatherCurrent(currentWeather) {
    const { city, date, temp, cloud, rain, snow } = currentWeather;
    const { currentHour } = getCurrentTime();
    const cloudFactor = [cloud[0], cloud[1](currentHour)];
    const rainFactor = [rain[0], rain[1](currentHour)];
    const snowFactor = [snow[0], snow[1](currentHour)];

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

    if (rainFactor[1] < 40 && snowFactor[1] < 60) {
        updateCurrentVisuals([cloudFactor[0], cloudFactor[1]]);
    } else if (rainFactor[1] >= 40 && snowFactor[1] < 60) {
        updateCurrentVisuals([cloudFactor[0], cloudFactor[1]], [rainFactor[0], rainFactor[1]]);
    } else if (rainFactor[1] < 40 && snowFactor[1] >= 60) {
        updateCurrentVisuals([snowFactor[0], snowFactor[1]]);
    }
}

// Show weather details by search query
function updateWeatherDetails(currentWeather, weatherDetails) {
    const { maxTemp, minTemp, humidity, cloud, wind } = weatherDetails;

    dom.details.maxTemp.textContent = maxTemp;
    dom.details.minTemp.textContent = minTemp;
    dom.details.humidity.textContent = humidity;
    dom.details.cloudy.textContent = cloud;
    dom.details.wind.textContent = wind;

    setWindStatus(currentWeather, weatherDetails);
}

const setWindStatus = (currentWeather, weatherDetails) => {
    const { wind } = weatherDetails;
    const { temp } = currentWeather;
    const windSpeed = weatherConfig.wind.setWindSpeed(wind);
    const windTemperature = weatherConfig.wind.setWindTemperature(temp);
    const windDescription = weatherConfig.wind.adviceMap[windSpeed][windTemperature];

    dom.details.description.textContent = windDescription;
}

const getRainChance = (weatherData, currentHour) => {
    const rainChance = weatherData.forecast.forecastday[0].hour[currentHour].chance_of_rain;
    return rainChance;
}

const getSnowChance = (weatherData, currentHour) => {
    const snowChance = weatherData.forecast.forecastday[0].hour[currentHour].chance_of_snow;
    return snowChance;
}

// Show next 12 hours weather forecast
function updateWeatherForecast(currentWeather) {
    const { city, date, temp, cloud, rain, snow, dayIndex } = currentWeather;
    let { currentHour, currentMinute } = getCurrentTime();

    for (let forecastCounter = 1; forecastCounter <= 24; forecastCounter++) {
        // Declare next forecast hour
        const template = dom.forecast.item.content.cloneNode(true);
        const nextHour = template.querySelector('[data-js="f-time"]');
        const nextTemp = template.querySelector('[data-js="f-temp"]');
        const nextDesc = template.querySelector('[data-js="f-desc"]');
        const nextIcon = template.querySelector('[data-js="f-icon"]');

        // Calculating the next hour
        currentHour = (currentHour + 1) % 24;
        const cloudFactor = [cloud[0], cloud[1](currentHour)];
        const rainFactor = [rain[0], rain[1](currentHour)];
        const snowFactor = [snow[0], snow[1](currentHour)];
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
        const getVisualsData = () => {
            if (rainFactor[1] < 40 && snowFactor[1] < 60) {
                return updateForecastVisuals(dayPeriod, [cloudFactor[0], cloudFactor[1]]);
            } else if (rainFactor[1] >= 40 && snowFactor[1] < 60) {
                return updateForecastVisuals(dayPeriod, [cloudFactor[0], cloudFactor[1]], [rainFactor[0], rainFactor[1]]);
            } else if (rainFactor[1] < 40 && snowFactor[1] >= 60) {
                return updateForecastVisuals(dayPeriod, [snowFactor[0], snowFactor[1]]);
            }
        }

        const visualsData = getVisualsData();
        const iconPath = visualsData[0];
        const weatherStatus = visualsData[1];

        nextIcon.style.backgroundImage = iconPath;
        nextDesc.textContent = weatherStatus;
    }
}

function updateForecastVisuals(dayPeriod, cloudiness, precip = false) {
    const weatherStatus = getWeatherStatus(cloudiness, precip);
    const factor = precip ? precip[0] : cloudiness[0];
    const { iconPath } = generateAssetPath(dayPeriod, factor, weatherStatus);

    if (dayPeriod === 'night' && ['clear', 'clear-no-precip'].includes) {
        return [iconPath, weatherConfig.cloud.none[0][2]];
    } else {
        return [iconPath, weatherStatus];
    }
}

// Update visuals in current weather UI
function updateCurrentVisuals(cloudiness, precip = false) {
    const { currentHour } = getCurrentTime();
    const dayPeriod = setDayCycle(currentHour);
    const weatherStatus = getWeatherStatus(cloudiness, precip);
    const factor = precip ? precip[0] : cloudiness[0];
    const { iconPath, backgroundPath } = generateAssetPath(dayPeriod, factor, weatherStatus);

    dom.current.icon.style.backgroundImage = iconPath;
    dom.current.background.style.backgroundImage = backgroundPath;
}

function generateAssetPath(dayPeriod, factor, weatherStatus) {
    let iconPath = '';
    let backgroundPath = '';

    iconPath = `url('assets/icons/${dayPeriod}/${factor}/${weatherStatus}.svg')`;
    backgroundPath = `url('assets/images/background/${dayPeriod}/${factor}/${weatherStatus}.jpg')`;

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

function getWeatherStatus(cloudiness, precip = false) {
    const [cloudName, cloudPercentage] = cloudiness;
    let precipName, precipPercentage;
    if (precip) [precipName, precipPercentage] = precip;
    const cloudData = weatherConfig[cloudName];
    const precipData = precip ? weatherConfig[precipName] : null;

    if (!cloudiness) {
        console.error(`Invalid cloudiness data: ${cloudiness}`);
        return null;
    }

    const getFactorStatus = (factor = cloudData, percentage = cloudPercentage) => {
        if (percentage <= factor.none[1]) return factor.none[0][0];
        if (percentage <= factor.light[1]) return factor.light[0][0];
        if (percentage <= factor.medium[1]) return factor.medium[0][0];
        if (percentage <= factor.heavy[1]) return factor.heavy[0][0];
    }

    let cloudStatus, precipStatus;
    cloudStatus = getFactorStatus();

    if (precip) {
        precipStatus = getFactorStatus(precipData, precipPercentage);
        return `${cloudStatus}-${precipStatus}`;
    } else {
        return cloudStatus;
    };

    console.error(`Invalid cloudiness percentage: ${cloudiness}`);
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

        const weatherParams = await getWeatherParams();
        console.log(weatherParams);

        updateWeatherCurrent(weatherParams.current);
        updateWeatherDetails(weatherParams.current, weatherParams.details);
        updateWeatherForecast(weatherParams.current);

        useFade([
            dom.placeholder.section,
            dom.current.section.active,
            dom.current.section.default,
            dom.details.section,
            dom.forecast.section
        ]);

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


export { showContent };