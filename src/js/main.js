import '../scss/main.scss';
import i18 from './modules/translator.js';

import {
    dom,
    dayCycles,
    weatherConfig,
} from './modules/constants.js';

import {
    getSearchHints,
    getWeatherParams,
} from './modules/api.js';

import {
    useFade,
} from './modules/animations.js';

import {
    updateWeatherCurrent,
    updateWeatherDetails,
    updateWeatherForecast,
    updateSearchHints,
    showContent,
} from './modules/dom-handlers.js';

import {
    initAssets
} from './modules/db.js';

initAssets();


// Render user's search query
dom.search.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const storedCity = localStorage.getItem('city');

    try {
        const weatherParams = await getWeatherParams();
        const currentCity = weatherParams.current.city[0];
        const domCity = dom.current.city.textContent;

        if (storedCity !== currentCity || storedCity === currentCity && domCity === '') {
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
        }

    } catch (error) {
        console.error('Error fetching weather data: ', error);
    }
})

dom.search.input.addEventListener('input', async (event) => {
    const hintsList = dom.search.hints.list;
    const inputValue = event.target.value;
    const query = inputValue;
    setTimeout(updateSearchHints, 1000, query);

    if (inputValue === '') {
        hintsList.classList.add('is-hidden');
        hintsList.replaceChildren();
    }

    if (inputValue !== '' && hintsList.children.length > 1) {
        hintsList.classList.remove('is-hidden');
    }
})