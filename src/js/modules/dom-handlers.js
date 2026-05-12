import {
    dom,
    weatherConfig,
} from './constants.js'

import {
    getCurrentLang,
    getCurrentTime,
    normalizeText,
    setDayCycle,
    translateText,
    getOverlayOpacity,
} from './utils.js';

import {
    getWeatherStatus,
    generateAssetPath,
    setPriorityFactor,
} from './weather-logic.js';

import {
    translateCity,
} from './api.js';

import i18next from 'i18next';


const updateWeatherCurrent = async (currentWeather) => {
    const { city, date, temp, cloud, rain, snow } = currentWeather;
    localStorage.setItem('city', city);
    const translatedCity = await translateCity(city);
    const normalizedCity = normalizeText([translatedCity]);

    dom.current.city.textContent = normalizedCity;
    dom.current.temp.textContent = temp;
    dom.current.time.textContent = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    dom.current.weekDay.textContent = date.toLocaleString('en-US', { weekday: 'long' });
    dom.current.day.textContent = date.getDate();
    dom.current.month.textContent = date.toLocaleString('en-US', { month: 'short' });
    dom.current.year.textContent = date.getFullYear().toString().slice(-2);

    translateText([dom.current.weekDay, dom.current.month]);

    const { currentHour } = getCurrentTime();
    const cloudFactor = [cloud[0], cloud[1](currentHour)];
    const rainFactor = [rain[0], rain[1](currentHour)];
    const snowFactor = [snow[0], snow[1](currentHour)];
    const factors = [cloudFactor, rainFactor, snowFactor];

    setPriorityFactor('current-section', currentHour, factors);
}

function updateWeatherDetails(currentWeather, weatherDetails) {
    const { maxTemp, minTemp, humidity, cloud, wind } = weatherDetails;

    dom.details.maxTemp.textContent = maxTemp;
    dom.details.minTemp.textContent = minTemp;
    dom.details.humidity.textContent = humidity;
    dom.details.cloudy.textContent = cloud;
    dom.details.wind.textContent = wind;

    setWindStatus(currentWeather, weatherDetails);
}

function updateWeatherForecast(currentWeather) {
    const { city, date, temp, cloud, rain, snow, dayIndex } = currentWeather;
    const currentLang = i18next.language;
    let { currentHour, currentMinute } = getCurrentTime();

    for (let isLastHour; isLastHour !== true;) {
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
        const factors = [cloudFactor, rainFactor, snowFactor];
        const formattedHour = currentHour.toString().padStart(2, '0');
        isLastHour = formattedHour === '00' ? true : false;
        const formattedMinute = currentMinute = '00';
        nextHour.textContent = `${formattedHour}:${formattedMinute}`;

        // Extract the temperature value for a specific hour
        const nextHourData = dayIndex.hour[currentHour];
        const nextCloud = dayIndex.hour[currentHour].cloud;
        nextTemp.textContent = Math.round(nextHourData.temp_c);

        dom.forecast.list.appendChild(template);

        // Extract the weather icon & description for a specific hour
        const dayPeriod = setDayCycle(currentHour);
        const visualsData = setPriorityFactor('forecast-section', currentHour, factors);
        const iconPath = visualsData[0];
        const weatherStatus = visualsData[1];
        nextDesc.textContent = weatherStatus;

        translateText([nextDesc]);

        nextIcon.style.backgroundImage = iconPath;
    }
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

function updateCurrentVisuals(dayPeriod, cloudiness, precip = false) {
    const weatherStatus = getWeatherStatus(dayPeriod, cloudiness, precip);
    const factor = precip ? precip[0] : cloudiness[0];
    const { iconPath, backgroundPath } = generateAssetPath(dayPeriod, factor, weatherStatus);
    const overlay = getOverlayOpacity(weatherStatus);

    dom.current.icon.style.backgroundImage = iconPath;
    dom.current.background.style.backgroundImage = `${overlay}, ${backgroundPath}`;
}

function updateForecastVisuals(dayPeriod, cloudiness, precip = false) {
    const weatherStatus = getWeatherStatus(dayPeriod, cloudiness, precip);
    const factor = precip ? precip[0] : cloudiness[0];
    const { iconPath } = generateAssetPath(dayPeriod, factor, weatherStatus);

    const getForecastDesc = () => {
        let descElems = weatherStatus.split('-');

        descElems.forEach((value, index, array) => {
            array[index] = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        });

        if (descElems.length === 1) return `${descElems[0]}`;
        if (descElems.length === 2) return `${descElems[0]} ${descElems[1]}`;
        if (descElems.length === 3) descElems.splice(0, 1);
        if (descElems.length === 4) descElems.splice(0, 2);

        return `${descElems[0]} ${descElems[1]}`
    }

    return [iconPath, getForecastDesc()];
}

const setWindStatus = (currentWeather, weatherDetails) => {
    const { wind } = weatherDetails;
    const { temp } = currentWeather;
    const hintsMap = weatherConfig.wind;

    const descElem = dom.details.description;
    const windSpeed = hintsMap.setWindSpeed(wind);
    const windTemperature = hintsMap.setWindTemperature(temp);
    descElem.textContent = `${windSpeed} ${windTemperature} wind`;

    translateText([descElem]);
}

const switchLanguage = async () => {
    const lang = getCurrentLang();
    i18next.changeLanguage(lang);

    const textElems = document.querySelectorAll('[data-i18n]');

    textElems.forEach((element) => {
        const textKey = element.getAttribute('data-i18n');
        const translatedText = i18next.t(textKey);

        if (textKey !== 'search_placeholder') {
            // If element textContent is not a number
            if (!/\d/.test(element.textContent)) element.innerHTML = translatedText;

            // If element has --after-text property
            element.style.setProperty('--after-text', `'${translatedText}'`);
        } else {
            element.placeholder = i18next.t(textKey);
        }
    });

    const city = localStorage.getItem('city');
    const translatedCity = city != ''
        ? await translateCity(city)
        : ''

    dom.current.city.textContent = translatedCity;
}


dom.search.form.addEventListener('input', (event) => {
    event.preventDefault();

    if (dom.search.input.value.length >= 1) {
        dom.search.submitBtn.style.display = 'none';
        dom.search.resetBtn.style.display = 'flex';
    } else {
        dom.search.submitBtn.style.display = 'flex';
        dom.search.resetBtn.style.display = 'none';
    }
});

dom.search.form.addEventListener('reset', (event) => {
    event.preventDefault();

    dom.search.submitBtn.style.display = 'flex';
    dom.search.resetBtn.style.display = 'none';
    dom.search.input.value = '';
});

dom.header.lang.toggle.addEventListener('click', (event) => {
    event.preventDefault();

    const lang = getCurrentLang();
    const slider = dom.header.lang.slider;
    console.log(lang);

    slider.classList.toggle('language__slider--active');

    switchLanguage();
});

window.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language');
    const slider = dom.header.lang.slider;

    if (lang === 'uk') slider.classList.add('language__slider--active');
    switchLanguage();
})


export {
    showContent,
    updateCurrentVisuals,
    updateForecastVisuals,
    setWindStatus,
    updateWeatherCurrent,
    updateWeatherDetails,
    updateWeatherForecast,
}