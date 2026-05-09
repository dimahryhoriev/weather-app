const dom = {
    header: {
        lang: {
            toggle: document.querySelector('.header__language'),
            slider: document.querySelector('.language__slider'),
            item: document.querySelector('.language__item'),
            list: {
                en: document.querySelector('[data-js="lang-en"]'),
                ua: document.querySelector('[data-js="lang-ua"]'),
            }
        },
    },

    search: {
        form: document.querySelector('.dashboard__search'),
        input: document.querySelector('.dashboard__search-input'),
        submitBtn: document.querySelector('.dashboard__search-btn'),
        resetBtn: document.querySelector('.dashboard__search-btn--reset')
    },

    current: {
        section: {
            active: document.querySelector('.current__content--active'),
            default: document.querySelector('.current__content--default')
        },
        temp: document.querySelector('[data-js="c-temp"]'),
        city: document.querySelector('[data-js="c-city"]'),
        time: document.querySelector('[data-js="c-time"]'),
        weekDay: document.querySelector('[data-js="c-week-day"]'),
        day: document.querySelector('[data-js="c-day"]'),
        month: document.querySelector('[data-js="c-month"]'),
        year: document.querySelector('[data-js="c-year"]'),
        icon: document.querySelector('[data-js="c-icon"]'),
        background: document.body
    },

    details: {
        section: document.querySelector('.dashboard__details'),
        description: document.querySelector('.details__subtitle'),
        maxTemp: document.querySelector('[data-js="temp-max"]'),
        minTemp: document.querySelector('[data-js="temp-min"]'),
        humidity: document.querySelector('[data-js="humidity"]'),
        cloudy: document.querySelector('[data-js="cloudy"]'),
        wind: document.querySelector('[data-js="wind"]')
    },

    forecast: {
        section: document.querySelector('.dashboard__forecast'),
        list: document.querySelector('.forecast__metrics'),
        item: document.querySelector('[data-js="forecast-item"]')
    },

    placeholder: {
        section: document.querySelector('.dashboard__placeholder')
    }
}

const dayCycles = {
    Jan: { startOfDay: 8, endOfDay: 17 },
    Feb: { startOfDay: 7, endOfDay: 17 },
    Mar: { startOfDay: 7, endOfDay: 19 },
    Apr: { startOfDay: 6, endOfDay: 20 },
    May: { startOfDay: 5, endOfDay: 21 },
    Jun: { startOfDay: 5, endOfDay: 21 },
    Jul: { startOfDay: 5, endOfDay: 21 },
    Aug: { startOfDay: 6, endOfDay: 20 },
    Sep: { startOfDay: 7, endOfDay: 19 },
    Oct: { startOfDay: 7, endOfDay: 18 },
    Nov: { startOfDay: 7, endOfDay: 16 },
    Dec: { startOfDay: 8, endOfDay: 16 },
}

const weatherConfig = {
    cloud: {
        none: [['clear', 'sunny'], 25],
        light: [['partly-cloudy'], 45],
        medium: [['mostly-cloudy'], 70],
        heavy: [['overcast'], 100],
    },

    wind: {
        adviceMap: {
            'light': {
                'cold_wind': 'Chilly breeze. Wear a warm coat.',
                'cool_wind': 'Fresh air. A light hoodie is enough.',
                'warm_wind': 'Perfect weather. Enjoy the sun!'
            },

            'moderate': {
                'cold_wind': 'Biting wind. Layer up with a windbreaker.',
                'cool_wind': 'Breezy. Keep your jacket zipped.',
                'warm_wind': 'Nice breeze. No extra layers needed.'
            },

            'strong': {
                'cold_wind': 'Freezing gale! Wear a scarf and thick coat.',
                'cool_wind': 'Very windy. A sturdy jacket is a must.',
                'warm_wind': 'Warm but gusty. Hold onto your hat!'
            },

            'storm': {
                'cold_wind': 'Danger! Extreme wind chill. Stay indoors.',
                'cool_wind': 'Storm alert. Avoid trees and seek shelter.',
                'warm_wind': 'Severe winds. Stay safe inside.'
            }
        },

        setWindSpeed: (speed) => {
            if (speed <= 5) return 'light';
            if (speed <= 11) return 'moderate';
            if (speed <= 19) return 'strong';
            if (speed >= 20) return 'storm';
        },

        setWindTemperature: (temperature) => {
            if (temperature < 10) return 'cold';
            if (temperature < 15) return 'cool';
            if (temperature >= 15) return 'warm';
        },
    },

    rain: {
        none: [['no-precip'], 20],
        light: [['light-rain'], 40],
        medium: [['medium-rain'], 60],
        heavy: [['heavy-rain'], 100],
    },

    snow: {
        none: [['no-precip'], 20],
        light: [['light-snow'], 40],
        medium: [['medium-snow'], 60],
        heavy: [['snow'], 100],
    }
}


export {
    dom,
    dayCycles,
    weatherConfig,
};