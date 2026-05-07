import {
    dom,
    dayCycles,
} from './constants.js';


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

const getLang = (type) => {
    const slider = dom.header.lang.slider;
    let notActiveLang;
    let activeLang;

    if (slider.classList.contains('language__slider--active')) {
        notActiveLang = 'en';
        activeLang = 'ua';
    } else {
        notActiveLang = 'ua';
        activeLang = 'en';
    }

    if (type === 'active') return activeLang;
    if (type === 'not-active') return notActiveLang;
}


export {
    getCurrentTime,
    setDayCycle,
    getRainChance,
    getSnowChance,
    getLang,
}