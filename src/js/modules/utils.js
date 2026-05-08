import {
    dom,
    dayCycles,
} from './constants.js';

import i18next from 'i18next';


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

const getRainChance = (weatherData, currentHour) => {
    const rainChance = weatherData.forecast.forecastday[0].hour[currentHour].chance_of_rain;
    return rainChance;
}

const getSnowChance = (weatherData, currentHour) => {
    const snowChance = weatherData.forecast.forecastday[0].hour[currentHour].chance_of_snow;
    return snowChance;
}

const getCurrentLang = () => {
    const slider = dom.header.lang.slider;
    let currentLang;

    if (slider.classList.contains('language__slider--active')) {
        currentLang = 'ua';
    } else {
        currentLang = 'en';
    }

    return currentLang;
}

const translateText = (element) => {
    const textKey = element.getAttribute('data-i18n');
    const translatedText = i18next.t(textKey);

    return { textKey, translatedText };
}


export {
    getCurrentTime,
    setDayCycle,
    getRainChance,
    getSnowChance,
    getCurrentLang,
    translateText,
}