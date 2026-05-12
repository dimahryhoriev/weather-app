import {
    dom,
    dayCycles,
    locationConfig,
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
        currentLang = 'uk';
    } else {
        currentLang = 'en';
    }

    localStorage.setItem('language', currentLang);

    return currentLang;
}

const translateText = (elems) => {
    const lang = i18next.language;

    elems.forEach(element => {
        const elemText = element.textContent;
        const elemKey = elemText.toLowerCase().replace(/\s+/g, '_');
        element.setAttribute('data-i18n', `${elemKey}`);

        if (lang === 'uk') {
            element.textContent = i18next.t(elemKey, { lng: 'uk' });
        } else {
            const translatedText = i18next.t(elemKey, { lng: 'en' });
            const normalizedText = normalizeText([translatedText]);
            element.textContent = normalizedText;
        }
    });
}

const normalizeText = (elems) => {
    const map = locationConfig.normalizationMap;
    const mapKeys = new RegExp(Object.keys(map).join('|'), 'g');

    return elems.map((element) => {
        const isLatinLetters = mapKeys.test(element);

        if (typeof element !== 'string' || isLatinLetters === false) return element;

        return element
            .replace(mapKeys, (match) => map[match])
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .trim()
    })
}

const getOverlayOpacity = (weatherStatus) => {
    console.log(weatherStatus);
    if (weatherStatus.includes('mostly-cloudy-heavy-rain' || 'snow')) {
        return 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25))';
    } else {
        return 'linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))';
    }
}


export {
    getCurrentTime,
    setDayCycle,
    getRainChance,
    getSnowChance,
    getCurrentLang,
    translateText,
    normalizeText,
    getOverlayOpacity,
}