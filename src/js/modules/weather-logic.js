import {
    getCurrentTime,
    setDayCycle,
} from "./utils.js";

import {
    updateCurrentVisuals,
    updateForecastVisuals,
} from "./dom-handlers.js";

import {
    weatherConfig,
} from './constants.js';


function getWeatherStatus(dayPeriod, cloudiness, precip = false) {
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
        if (percentage <= factor.none[1]) {
            if (dayPeriod === 'day') return factor.none[0][1];
            if (dayPeriod === 'night') return factor.none[0][0];
        }
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

function generateAssetPath(dayPeriod, factor, weatherStatus) {
    let iconPath;
    let backgroundPath;

    iconPath = `url('assets/icons/${dayPeriod}/${factor}/${weatherStatus}.svg')`;
    backgroundPath = `url('assets/images/background/${dayPeriod}/${factor}/${weatherStatus}.jpg')`;

    return { iconPath, backgroundPath };
}

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

const setPriorityFactor = (section, hour, factors) => {
    const [cloudFactor, rainFactor, snowFactor] = factors;
    const dayPeriod = setDayCycle(hour);

    let currentSection;
    if (section === 'current-section') currentSection = updateCurrentVisuals;
    if (section === 'forecast-section') currentSection = updateForecastVisuals;

    if (rainFactor[1] < 40 && snowFactor[1] <= 60) {
        return currentSection(dayPeriod, [cloudFactor[0], cloudFactor[1]]);
    } else if (rainFactor[1] >= 40 && snowFactor[1] <= 60 && cloudFactor[1] >= 45) {
        return currentSection(dayPeriod, [cloudFactor[0], cloudFactor[1]], [rainFactor[0], rainFactor[1]]);
    } else if (snowFactor[1] > 60 && cloudFactor[1] >= 45) {
        return currentSection(dayPeriod, [snowFactor[0], snowFactor[1]]);
    }
}


export {
    getWeatherStatus,
    generateAssetPath,
    setPriorityFactor,
}