const dom = {
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
        clear: ['clear', 'Sunny', 'Clear'],
        partly: ['partly-cloudy', 'Partly Cloudy'],
        mostly: ['mostly-cloudy', 'Mostly Cloudy'],
        overcast: ['overcast', 'Overcast'],
    }
}

export { dom, dayCycles, weatherConfig };